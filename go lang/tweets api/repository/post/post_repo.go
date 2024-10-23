package post

import (
	"context"
	"errors"
	"fmt"
	"tweet/database/types"

	"github.com/jmoiron/sqlx"
	"github.com/redis/go-redis/v9"
)

type PostRepo struct {
	DB      *sqlx.DB
	RClient *redis.Client
}

func NewPostRepo(db *sqlx.DB, redisCli *redis.Client) *PostRepo {
	return &PostRepo{
		DB:      db,
		RClient: redisCli,
	}
}

func (p *PostRepo) CreatePost(payload *types.PostBody) error {
	_, err := p.DB.NamedExec("INSERT INTO tweet (title,content,user_id,type,price) VALUES (:title,:content,:user_id,:type,:price)", map[string]interface{}{
		"title":   payload.Title,
		"content": payload.Content,
		"user_id": payload.UserId,
		"type":    payload.Type,
		"price":   payload.Price,
	})

	if err != nil {
		return err
	}
	return nil
}
func (p *PostRepo) UpdatePost(id int, payload *types.PostUpdateBody) error {
	post, err := p.GetPost(id)
	if err != nil {
		return err
	}

	if payload.Title == nil {
		payload.Title = &post.Title
	}

	if payload.Content == nil {
		payload.Content = &post.Content
	}

	if payload.Type == nil {
		payload.Type = &post.Type
	}

	if payload.Price == nil {
		payload.Price = &post.Price
	}
	fmt.Println(payload)
	query := `UPDATE tweet SET title=?,content=?,type=?,price=? WHERE id=?`
	_, qerr := p.DB.Exec(p.DB.Rebind(query), *payload.Title, *payload.Content, *payload.Type, *payload.Price, id)
	if qerr != nil {
		return err
	}
	return nil
}
func (p *PostRepo) DeletePost(id int) error {
	query := `DELETE FROM tweet WHERE id=?`
	_, err := p.DB.Exec(p.DB.Rebind(query), id)
	if err != nil {
		return err
	}
	return nil
}

func (p *PostRepo) GetPost(id int) (*types.Post, error) {
	post := &types.Post{}
	if err := p.DB.Get(post, "SELECT * FROM tweet WHERE id=$1", id); err != nil {
		return nil, err
	}

	return post, nil
}

func (p *PostRepo) CreateComment(payload *types.CommentBody) error {
	_, err := p.DB.NamedExec("INSERT INTO comments (content,user_id,post_id) VALUES (:content,:user_id,:post_id)", map[string]interface{}{
		"content": payload.Content,
		"user_id": payload.UserId,
		"post_id": payload.PostId,
	})

	if err != nil {
		return err
	}
	return nil
}

func (p *PostRepo) IsLiked(user_id int, post_id int) error {
	like := &types.Like{}
	if err := p.DB.Get(like, "SELECT * FROM likes WHERE user_id=$1 AND post_id=$2", user_id, post_id); err != nil {
		return err
	}

	return nil
}

func (p *PostRepo) CreateLike(payload *types.LikeBody) error {

	fmt.Println(payload.UserId)
	if err := p.IsLiked(payload.UserId, payload.PostId); err == nil {
		return errors.New("user already liked the post")
	}
	_, err := p.DB.NamedExec("INSERT INTO likes (user_id,post_id) VALUES (:user_id,:post_id)", map[string]interface{}{
		"user_id": payload.UserId,
		"post_id": payload.PostId,
	})

	if err != nil {
		return err
	}
	return nil
}

func (p *PostRepo) GetUser(postid int) (*int, error) {
	post := &types.Post{}
	if err := p.DB.Get(post, "SELECT * FROM tweet WHERE ID=$1", postid); err != nil {
		return nil, err
	}

	return &post.UserId, nil
}

var ctx = context.Background()

func (n *PostRepo) CreateChannel(user_id int) string {
	return fmt.Sprintf("user_notify_%d", user_id)
}

func (n *PostRepo) PublishToChannel(user_id int, msg string) *redis.IntCmd {
	return n.RClient.Publish(ctx, n.CreateChannel(user_id), msg)
}
