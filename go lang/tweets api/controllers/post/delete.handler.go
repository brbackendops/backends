package post

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (pc *PostController) DeletePostHandler(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	if err := pc.Ps.PostDeleteService(id); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"status":  "failed",
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"status":  "failed",
		"message": "post deleted successfully",
	})
}
