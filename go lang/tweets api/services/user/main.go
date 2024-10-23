package user

import (
	userR "tweet/repository/user"

	"github.com/golang-jwt/jwt/v5"
)

type UserService struct {
	UserRepo userR.UserRepoInterface
}

type UserJWTClaims struct {
	Id       int    `db:"id" json:"id"`
	Username string `db:"username" json:"username"`
	Email    string `db:"email" json:"email"`
	jwt.RegisteredClaims
}

func NewUserService(repo userR.UserRepoInterface) *UserService {
	return &UserService{
		UserRepo: repo,
	}
}
