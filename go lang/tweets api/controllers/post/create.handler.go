package post

import (
	"fmt"
	"net/http"
	"tweet/database/types"

	"github.com/labstack/echo/v4"
)

func (pc *PostController) CreatePostHandler(c echo.Context) error {
	user := c.Get("user").(types.UserClaimed)
	payload := &types.PostBody{}
	payload.UserId = user.Id

	if err := c.Bind(payload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	fmt.Println("data: ", payload)
	if payload.Type == "free" {
		payload.Type = "Free"
	}

	if payload.Type == "paid" {
		payload.Type = "Paid"
	}

	if payload.Type == "Paid" || payload.Type == "paid" && payload.Price <= 0 {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"status":  "failed",
			"message": "if the post is paid , please specify the price",
		})
	}

	if err := pc.Ps.PostCreatePostService(payload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"status":  "success",
		"message": "post successfully created",
	})
}
