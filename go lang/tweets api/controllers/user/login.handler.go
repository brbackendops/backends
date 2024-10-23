package user

import (
	"net/http"
	"time"
	"tweet/database/types"

	"github.com/labstack/echo/v4"
)

func (uc *UserController) UserLoginHandler(c echo.Context) error {
	userPayload := &types.UserLogin{}
	if err := c.Bind(userPayload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	token, err := uc.UService.UserLogin(userPayload)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	cookie := &http.Cookie{
		Name:     "cookie_token",
		Path:     "/",
		Value:    *token,
		Expires:  time.Now().Add(15 * time.Minute),
		HttpOnly: true,
	}
	c.SetCookie(cookie)

	return c.JSON(http.StatusOK, map[string]interface{}{
		"status":  "success",
		"message": "user logged in successfully",
	})

}
