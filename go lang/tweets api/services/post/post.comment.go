package post

import "tweet/database/types"

func (ps *PostService) CreateCommentService(payload *types.CommentBody) error {
	err := ps.PostRepo.CreateComment(payload)
	if err != nil {
		return err
	}
	return nil
}
