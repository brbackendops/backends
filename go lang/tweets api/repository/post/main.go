package post

import (
	"tweet/database/types"

	"github.com/redis/go-redis/v9"
)

type PostRepoInterface interface {
	CreatePost(*types.PostBody) error
	UpdatePost(int, *types.PostUpdateBody) error
	DeletePost(int) error
	GetPost(int) (*types.Post, error)
	CreateComment(*types.CommentBody) error
	CreateLike(*types.LikeBody) error
	CreateChannel(user_id int) string
	PublishToChannel(user_id int, msg string) *redis.IntCmd
	GetUser(int) (*int, error)
}
