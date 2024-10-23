package user

import "tweet/database/types"

func (us *UserService) UserUpdate(id int, payload *types.UserUpdate) error {
	if err := us.UserRepo.UpdateById(id, payload); err != nil {
		return err
	}
	return nil
}
