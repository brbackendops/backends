package post

import (
	"errors"
	"tweet/database/types"
)

func (ps *PostService) PostUpdateService(id int, payload *types.PostUpdateBody) error {

	if *payload.Type == "paid" && payload.Price == nil || *payload.Price <= 0 {
		return errors.New("must specify price for paid post")
	}

	if *payload.Type == "paid" {
		*payload.Type = "Paid"
	}

	if *payload.Type == "free" {
		*payload.Type = "Free"
	}

	err := ps.PostRepo.UpdatePost(id, payload)
	if err != nil {
		return err
	}
	return nil
}
