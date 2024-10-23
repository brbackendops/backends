package user

import "tweet/database/types"

func (us *UserService) GetUserFollowersCount(id int) (*types.UserFolowersCount, error) {
	data, err := us.UserRepo.CountFollowers(id)
	if err != nil {
		return nil, err
	}

	return data, err
}
