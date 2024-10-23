package user

import (
	userService "tweet/services/user"
)

type UserController struct {
	UService userService.UserService
}

func NewUserController(uservice userService.UserService) *UserController {
	return &UserController{
		UService: uservice,
	}
}
