package user

func (us *UserService) CreateUserFollowings(leaderId, followingId int) error {
	err := us.UserRepo.CreateFollowings(leaderId, followingId)
	if err != nil {
		return err
	}
	return nil
}
