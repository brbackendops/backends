package middlewares

import (
	"strings"

	usercontrollers "project/controllers/userControllers"

	"github.com/gofiber/fiber/v2"
)

func Authenticate(c *fiber.Ctx) error {
	headers := c.GetReqHeaders()
	if headers != nil && headers["Authorization"] == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status": "failed",
			"error":  "user is not authenticated",
		})
	}

	token_from_headers := headers["Authorization"][0]
	t := strings.Split(token_from_headers, " ")
	if len(t) < 1 {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status": "failed",
			"error":  "Bearer not found in Authorization headers",
		})
	}

	token := t[1]
	user, err := usercontrollers.VerifyToken(token)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status": "failed",
			"error":  err.Error(),
		})
	}

	c.Locals("user_id", user.Id)
	return c.Next()
}
