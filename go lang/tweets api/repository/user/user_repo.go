package user

import (
	"context"
	"errors"
	"fmt"
	"time"
	"tweet/database/types"

	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"github.com/redis/go-redis/v9"
)

type UserRepo struct {
	DB      *sqlx.DB
	Rclient *redis.Client
}

func NewUserRepo(db *sqlx.DB, redisClient *redis.Client) *UserRepo {
	return &UserRepo{
		DB:      db,
		Rclient: redisClient,
	}
}

func (u *UserRepo) Create(username string, password string, email string) error {

	_, err := u.DB.NamedExec("INSERT INTO users (username,password,email) VALUES (:username,:password,:email) ", map[string]interface{}{
		"username": username,
		"password": password,
		"email":    email,
	})

	if err != nil {
		if dberr, ok := err.(*pq.Error); ok && dberr.Code.Name() == "unique_violation" {
			return errors.New("user with this email already exists")
		}
		return err
	}

	return nil
}

func (u *UserRepo) GetByEmail(email string) (*types.User, error) {
	user := &types.User{}
	if err := u.DB.Get(user, "SELECT * FROM users WHERE email=$1", email); err != nil {
		return nil, err
	}
	return user, nil
}

func (u *UserRepo) GetById(id int) (*types.User, error) {
	user := &types.User{}
	if err := u.DB.Get(user, "SELECT * FROM users WHERE id=$1", id); err != nil {
		return nil, err
	}
	return user, nil
}

func (u *UserRepo) UpdateById(id int, payload *types.UserUpdate) error {
	user := &types.User{}
	if err := u.DB.Get(user, "SELECT * FROM users WHERE id=$1", id); err != nil {
		return err
	}

	if payload.Email == nil {
		payload.Email = &user.Email
	}

	if payload.Username == nil {
		payload.Username = &user.Username
	}

	updatedTime := time.Now().UTC().Round(time.Microsecond)
	query := `UPDATE users SET username=?,email=?,updated_at=? WHERE id=?`
	_, err := u.DB.Exec(u.DB.Rebind(query), payload.Username, payload.Email, updatedTime, id)
	if err != nil {
		if dberr, ok := err.(*pq.Error); ok && dberr.Code.Name() == "unique_violation" {
			return errors.New("user with this email already exists")
		}
		return err
	}

	return nil
}

func (u *UserRepo) Delete(id int) error {
	query := "DELETE FROM users WHERE id=?"
	_, err := u.DB.Exec(u.DB.Rebind(query), id)
	if err != nil {
		return err
	}

	return nil
}

func (u *UserRepo) CreateFollowers(leaderId, followerId int) error {

	_, lerr := u.GetById(leaderId)
	// fmt.Println("lerr", lerr)
	if lerr != nil {
		return lerr
	}

	_, ferr := u.GetById(followerId)
	// fmt.Println("ferr", ferr)
	if ferr != nil {
		return ferr
	}

	_, err := u.DB.NamedExec("INSERT INTO followers (leader_id,follower_id) VALUES (:leaderId,:followerId)", map[string]interface{}{
		"leaderId":   leaderId,
		"followerId": followerId,
	})

	if err != nil {
		if dberr, ok := err.(*pq.Error); ok && dberr.Code.Name() == "unique_violation" {
			return errors.New("Already following these user")
		}
		return err
	}

	return nil
}

func (u *UserRepo) CreateFollowings(leaderId, followedId int) error {

	_, lerr := u.GetById(leaderId)
	if lerr != nil {
		return lerr
	}

	_, ferr := u.GetById(followedId)
	if ferr != nil {
		return ferr
	}

	_, err := u.DB.NamedExec("INSERT INTO following (leader_id,followed_id) VALUES (:leaderId,:followedId)", map[string]interface{}{
		"leaderId":   leaderId,
		"followedId": followedId,
	})

	if err != nil {
		if dberr, ok := err.(*pq.Error); ok && dberr.Code.Name() == "unique_violation" {
			return errors.New("Already following these user")
		}
		return err
	}

	return nil
}

func (u *UserRepo) CountFollowings(id int) (*types.UserFolowersCount, error) {
	query := `	
		SELECT count(*),leader_id from following
		GROUP BY leader_id
		HAVING leader_id = ?;
	`
	data := &types.UserFolowersCount{}
	if err := u.DB.Get(data, u.DB.Rebind(query), id); err != nil {
		return nil, err
	}

	return data, nil
}

func (u *UserRepo) CountFollowers(id int) (*types.UserFolowersCount, error) {
	query := `	
		SELECT count(*),leader_id from followers
		GROUP BY leader_id
		HAVING leader_id = ?;
	`
	data := &types.UserFolowersCount{}
	if err := u.DB.Get(data, u.DB.Rebind(query), id); err != nil {
		return nil, err
	}

	return data, nil
}

func (u *UserRepo) GetFollowers(id int) (*types.GetUserFollow, error) {
	return nil, nil
}
func (u *UserRepo) GetFollowings(id int) (*types.GetUserFollow, error) {
	return nil, nil
}

var ctx = context.Background()

func (u *UserRepo) CreateChannel(user_id int) string {
	return fmt.Sprintf("user_notify_%d", user_id)
}

func (u *UserRepo) PublishToChannel(user_id int, msg string) *redis.IntCmd {
	return u.Rclient.Publish(ctx, u.CreateChannel(user_id), msg)
}

// get followers list and following list
/*

	Followers:
	SELECT f.leader_id , u.username FROM followers AS f
	INNER JOIN users AS u
	ON u.id = f.follower_id
	GROUP BY f.leader_id , u.username
	HAVING f.leader_id=3;

	Followings:
	SELECT f.leader_id , u.username FROM following AS f
	INNER JOIN users AS u
	ON u.id = f.followed_id
	GROUP BY f.leader_id , u.username
	HAVING f.leader_id=4;

*/
