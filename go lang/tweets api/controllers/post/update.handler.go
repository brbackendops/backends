package post

import (
	"net/http"
	"strconv"
	"tweet/database/types"

	"github.com/labstack/echo/v4"
)

func (pc *PostController) UpdatePostHandler(c echo.Context) error {
	payload := &types.PostUpdateBody{}
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	if err := c.Bind(payload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	if err := pc.Ps.PostUpdateService(id, payload); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"status":  "success",
		"message": "post updated successfully",
	})
}
