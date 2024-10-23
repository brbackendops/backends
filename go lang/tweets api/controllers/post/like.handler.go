package post

import (
	"net/http"
	"tweet/database/types"

	"github.com/labstack/echo/v4"
)

func (pc *PostController) CreateLikeHandler(c echo.Context) error {
	user := c.Get("user").(types.UserClaimed)

	payload := &types.LikeBody{}

	if err := c.Bind(payload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	payload.UserId = user.Id
	if err := pc.Ps.CreateLikeService(payload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	created_id, err := pc.Ps.PostRepo.GetUser(payload.PostId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}
	pc.Ps.PostRepo.PublishToChannel(*created_id, "user liked your post")
	return c.JSON(http.StatusCreated, map[string]interface{}{
		"status":  "success",
		"message": "successfully liked the post",
	})
}
