package userroutes

import (
	userController "project/controllers/userControllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	app.Route("/users", func(api fiber.Router) {
		api.Get("/", userController.WelcomeMsgUSer).Name("getUser")
		api.Get("/all", userController.GetAllUsers).Name("all")
		api.Post("/register", userController.RegisterUser).Name("register")
		api.Post("/login", userController.LoginHandler).Name("login")
	})
}
