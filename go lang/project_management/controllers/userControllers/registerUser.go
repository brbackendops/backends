package usercontrollers

import (
	"project/database/types"

	"github.com/gofiber/fiber/v2"
)

type User struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Age       int    `json:"age"`
}

func RegisterUser(c *fiber.Ctx) error {
	c.Accepts("application/json")
	c.Type("json", "utf-8")

	u := new(User)
	if err := c.BodyParser(u); err != nil {
		return err
	}

	if u.Password == "" {
		c.SendStatus(400)
		return c.JSON(fiber.Map{
			"status":  "failed",
			"message": "password is required",
		})
	}
	// db := database.ConnectDb()

	// users := []types.User{}
	user := types.User{}
	user_exist := Db.Get(&user, "SELECT * FROM users WHERE email=$1", u.Email)

	if user_exist == nil {
		return c.Status(400).JSON(fiber.Map{
			"status": "failed",
			"error":  "user already exists",
		})
	}
	// Db.Select(&users, "SELECT * FROM users ORDER BY DESC")
	hashedPassword, herr := HashPassword(u.Password)
	if herr != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status": "failed",
			"error":  herr,
		})
	}
	_, err := Db.NamedExec(`INSERT INTO users (first_name,last_name,email,password,age) VALUES (:FirstName,:LastName,:Email,:Password,:Age)`, map[string]interface{}{
		"FirstName": u.FirstName,
		"LastName":  u.LastName,
		"Email":     u.Email,
		"Password":  hashedPassword,
		"Age":       u.Age,
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "failed",
			"message": err,
		})
	}

	return c.Status(201).JSON(u)
}
