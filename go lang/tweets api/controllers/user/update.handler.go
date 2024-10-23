package user

import (
	"net/http"
	"tweet/database/types"

	"github.com/labstack/echo/v4"
)

func (us *UserController) UserUpdateProfile(c echo.Context) error {
	userPayload := &types.UserUpdate{}

	if err := c.Bind(userPayload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	user := c.Get("user").(types.UserClaimed)
	err := us.UService.UserUpdate(user.Id, userPayload)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"status":  "success",
		"message": "user details updated successfully",
	})

}
