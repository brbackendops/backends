package post

import "tweet/database/types"

func (ps *PostService) CreateLikeService(payload *types.LikeBody) error {
	err := ps.PostRepo.CreateLike(payload)
	if err != nil {
		return err
	}
	return nil
}
