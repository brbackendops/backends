package post

func (ps *PostService) PostDeleteService(id int) error {
	err := ps.PostRepo.DeletePost(id)
	if err != nil {
		return err
	}
	return nil
}
