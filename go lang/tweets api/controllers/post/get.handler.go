package post

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (pc *PostController) GetHandlerPost(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	post, err := pc.Ps.GetPostService(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusInternalServerError, map[string]interface{}{
		"status": "failed",
		"data":   post,
	})
}
