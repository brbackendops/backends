package user

import (
	"net/http"
	"tweet/database/types"

	"github.com/labstack/echo/v4"
)

func (uc *UserController) RegisterHandler(c echo.Context) error {
	userPayload := &types.UserCreate{}
	if err := c.Bind(userPayload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	if err := uc.UService.RegisterUser(userPayload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"status":  "success",
		"message": "user registered successfully",
	})
}
