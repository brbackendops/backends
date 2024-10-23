package post

import "tweet/database/types"

func (ps *PostService) GetPostService(id int) (*types.Post, error) {
	post, err := ps.PostRepo.GetPost(id)
	if err != nil {
		return nil, err
	}
	return post, nil
}
