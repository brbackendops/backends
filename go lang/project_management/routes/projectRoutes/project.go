package project

import (
	projectcontrollers "project/controllers/projectControllers"
	"project/middlewares"

	"github.com/gofiber/fiber/v2"
)

func ProjectRoutes(app *fiber.App) {
	app.Route("/project", func(api fiber.Router) {
		app.Use(middlewares.Authenticate)
		api.Post("/create", projectcontrollers.CreateProject)
		api.Put("/update", projectcontrollers.UpdateProject)
		api.Get("/", projectcontrollers.GetAllProjects)
	})
}
