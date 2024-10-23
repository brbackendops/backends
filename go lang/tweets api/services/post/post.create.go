package post

import "tweet/database/types"

func (ps *PostService) PostCreatePostService(payload *types.PostBody) error {
	err := ps.PostRepo.CreatePost(payload)
	if err != nil {
		return err
	}
	return nil
}
