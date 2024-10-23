package user

func (us *UserService) CreateUserFollower(leaderId, followerId int) error {
	err := us.UserRepo.CreateFollowers(leaderId, followerId)
	if err != nil {
		return err
	}
	return nil
}
