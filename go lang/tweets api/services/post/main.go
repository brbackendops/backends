package post

import (
	"tweet/repository/post"
)

type PostService struct {
	PostRepo post.PostRepoInterface
}

func NewPostService(postrepo post.PostRepoInterface) *PostService {
	return &PostService{
		PostRepo: postrepo,
	}
}
