package post

import (
	"tweet/services/post"
)

type PostController struct {
	Ps post.PostService
}

func NewPostController(postservice post.PostService) *PostController {
	return &PostController{
		Ps: postservice,
	}
}
