package user

import "tweet/database/types"

func (us *UserService) RegisterUser(payload *types.UserCreate) error {

	p, err := HashMyPassword([]byte(payload.Password))
	if err != nil {
		return err
	}
	if err := us.UserRepo.Create(payload.Username, string(p), payload.Email); err != nil {
		return err
	}

	return nil
}
