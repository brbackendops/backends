package usercontrollers

import (
	"fmt"

	"project/database/types"

	"github.com/gofiber/fiber/v2"
)

type UserLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func LoginHandler(c *fiber.Ctx) error {
	c.Accepts("application/json")

	ul := new(UserLogin)
	if err := c.BodyParser(ul); err != nil {
		panic(err)
	}

	user := types.User{}
	err := Db.Get(&user, "SELECT * FROM users WHERE email=$1", ul.Email)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status": "failed",
			"error":  "user not found",
		})
	}

	p_verified := CompareHashPassword(ul.Password, user.Password)

	if !p_verified {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "failed",
			"error":  "invalid password",
		})
	}

	token, err := SignToken(user)
	fmt.Println("jwt:error", err)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "failed",
			"error":  err,
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "success",
		"data": map[string]interface{}{
			"message": "login successfull",
			"token":   token,
		},
	})
}
