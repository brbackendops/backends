package user

import "tweet/database/types"

func (us *UserService) GetUserFollowingsCount(id int) (*types.UserFolowersCount, error) {
	data, err := us.UserRepo.CountFollowings(id)
	if err != nil {
		return nil, err
	}

	return data, err
}
