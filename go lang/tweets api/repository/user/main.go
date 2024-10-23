package user

import (
	"tweet/database/types"

	"github.com/redis/go-redis/v9"
)

type UserRepoInterface interface {
	Create(string, string, string) error
	GetByEmail(string) (*types.User, error)
	GetById(int) (*types.User, error)
	UpdateById(int, *types.UserUpdate) error
	Delete(int) error
	CreateFollowers(int, int) error
	CreateFollowings(int, int) error
	CountFollowings(int) (*types.UserFolowersCount, error)
	CountFollowers(int) (*types.UserFolowersCount, error)
	GetFollowers(int) (*types.GetUserFollow, error)
	GetFollowings(int) (*types.GetUserFollow, error)
	CreateChannel(int) string
	PublishToChannel(int, string) *redis.IntCmd
}
