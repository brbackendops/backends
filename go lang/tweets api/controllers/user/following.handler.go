package user

import (
	"fmt"
	"net/http"
	"tweet/database/types"

	"github.com/labstack/echo/v4"
)

func (uc *UserController) CreateUserFollowings(c echo.Context) error {
	payload := &types.UserFollowingBody{}
	fmt.Println(payload.FollowingId)
	if err := c.Bind(payload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	user := c.Get("user").(types.UserClaimed)
	err := uc.UService.CreateUserFollowings(user.Id, payload.FollowingId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	go uc.UService.UserRepo.PublishToChannel(payload.FollowingId, "user followed you")

	if err := uc.UService.CreateUserFollower(payload.FollowingId, user.Id); err != nil {

		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})

	}
	return c.JSON(http.StatusCreated, map[string]interface{}{
		"status":  "success",
		"message": "user successfully following the user",
	})
}

func (uc *UserController) CountFollowingssHandler(c echo.Context) error {
	user := c.Get("user").(types.UserClaimed)
	data, err := uc.UService.GetUserFollowingsCount(user.Id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"status": "failed",
		"data": map[string]interface{}{
			"followings": data.Count,
		},
	})
}
