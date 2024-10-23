package projectcontrollers

import (
	"fmt"

	"project/database/types"

	"github.com/gofiber/fiber/v2"
)

type (
	CreateProjectType struct {
		Name        string  `json:"name"`
		Description string  `json:"description"`
		Image       *string `json:"image"`
		IsActive    bool    `json:"is_active"`
	}
)

func CreateProject(ctx *fiber.Ctx) error {
	c := new(CreateProjectType)
	user_id := ctx.Locals("user_id")
	fmt.Println(user_id)

	if err := ctx.BodyParser(&c); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "failed",
			"error":  err,
		})
	}

	user := types.User{}
	user_exists := Db.Get(&user, "SELECT * FROM users WHERE id=$1", user_id)

	if user_exists != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "failed",
			"error":  "user with this credentials does not exists",
		})
	}

	if c.Image == nil {
		defaultValue := "https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg"
		c.Image = &defaultValue
	}
	// p := types.Project{}
	tx := Db.MustBegin()
	_, err := tx.NamedExec("INSERT INTO projects (name,description,image,is_active,user_id) VALUES (:Name,:Description,:Image,:IsActive,:UserId)", map[string]interface{}{
		"Name":        c.Name,
		"Description": c.Description,
		"Image":       c.Image,
		"IsActive":    c.IsActive,
		"UserId":      user_id,
	})
	tx.Commit()

	if err == nil {
		return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":  "success",
			"message": "project successfully created",
		})
	}

	return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
		"status": "failed",
		"error":  err,
	})
}
