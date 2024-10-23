package usercontrollers

import (
	"fmt"

	"project/database/types"

	"github.com/gofiber/fiber/v2"
)

func WelcomeMsgUSer(c *fiber.Ctx) error {
	return c.SendString("welcome to user routes")
}

func GetAllUsers(c *fiber.Ctx) error {
	users := []types.UserAll{}
	err := Db.Select(&users, "SELECT id , first_name , last_name , email, age FROM users;")
	if err != nil {
		fmt.Println(err)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "success",
		"data":   users,
	})
}
