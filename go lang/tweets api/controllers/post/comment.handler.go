package post

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"tweet/database/types"

	"github.com/labstack/echo/v4"
)

func (pc *PostController) CreateCommentHandler(c echo.Context) error {
	user := c.Get("user").(types.UserClaimed)
	payload := &types.CommentBody{}
	payload.UserId = user.Id

	postid, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	payload.PostId = postid

	if err := c.Bind(payload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	if err := pc.Ps.CreateCommentService(payload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}
	createdId, err := pc.Ps.PostRepo.GetUser(postid)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	msg := &types.NotificationMessage{
		UserId:       *createdId,
		FromUserId:   user.Id,
		FromUsername: user.Username,
		Message:      fmt.Sprintf("%s commented on yout post", user.Username),
		ReadStatus:   false,
	}
	data, err := json.Marshal(msg)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}
	go pc.Ps.PostRepo.PublishToChannel(*createdId, string(data))
	return c.JSON(http.StatusCreated, map[string]interface{}{
		"status":  "success",
		"message": "successfully commented the post",
	})
}
