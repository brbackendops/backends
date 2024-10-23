package projectcontrollers

import (
	"project/database/types"

	"github.com/gofiber/fiber/v2"
)

func GetAllProjects(ctx *fiber.Ctx) error {
	projects := []types.Project{}

	err := Db.Select(&projects, "SELECT * FROM projects")
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "failed",
			"error":  err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "success",
		"data":   projects,
	})
}
