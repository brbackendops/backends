package user

import (
	"net/http"
	"tweet/database/types"

	"github.com/labstack/echo/v4"
)

func (uc *UserController) CreateFollowers(c echo.Context) error {
	payload := &types.UserFollowerBody{}
	if err := c.Bind(payload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	err := uc.UService.CreateUserFollower(payload.LeaderId, payload.FollowerId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"status":  "success",
		"message": "user successfully become a follower",
	})
}

func (uc *UserController) CountFollowersHandler(c echo.Context) error {
	user := c.Get("user").(types.UserClaimed)
	data, err := uc.UService.GetUserFollowersCount(user.Id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"status": "failed",
		"data": map[string]interface{}{
			"followers": data.Count,
		},
	})
}
