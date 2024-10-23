package projectcontrollers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

type (
	ProjectUpdate struct {
		Name        string `json:"name,omitempty"`
		Description string `json:"description,omitempty"`
		IsActive    string `json:"is_active,omitempty"`
		Image       string `json:"image,omitempty"`
	}
)

func UpdateProject(ctx *fiber.Ctx) error {
	pu := ProjectUpdate{}

	if err := ctx.BodyParser(&pu); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "failed",
			"error":  err.Error(),
		})
	}

	scheme := "UPDATE FROM projects WHERE "
	values := []interface{}
	for key, value := range pu {
	}
	fmt.Println("update", pu.Description)
	return nil
}
