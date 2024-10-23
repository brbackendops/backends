package main

import (
	"net/http"

	"tweet/middlewares"
	"tweet/routes"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	// development
	corsconfig := middleware.CORSConfig{
		AllowOrigins: []string{"*", "http://localhost:5500", "http://127.0.0.1:5500"},
		AllowMethods: []string{http.MethodGet},
	}
	e.Use(middleware.CORSWithConfig(corsconfig))
	e.Use(middleware.Secure())
	e.Use(middlewares.Logger)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "welcome to tweets api")
	})

	routes.UserRoute(e)
	routes.NewPostRoute(e)
	routes.NewNotificationRoute(e)
	e.Logger.Fatal(e.Start(":3000"))
}
