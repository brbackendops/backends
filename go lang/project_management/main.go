package main

import (
	projectroutes "project/routes/projectRoutes"
	userroutes "project/routes/userRoutes"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/etag"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/valyala/fasthttp"
)

func main() {
	// connStr := "postgresql://postgres:password@localhost:5432/projects"
	app := fiber.New(fiber.Config{
		StrictRouting: true,
		AppName:       "project management api",
		ProxyHeader:   fiber.HeaderXForwardedFor,
		UnescapePath:  true,
		JSONEncoder:   json.Marshal,
		JSONDecoder:   json.Unmarshal,
	})

	app.Use(cors.New())
	app.Use(etag.New())
	app.Use(helmet.New())
	app.Use(logger.New(logger.Config{
		TimeZone: "Asia/Kolkata",
	}))

	app.Get("/metrics", monitor.New(monitor.Config{
		Title: "project api metrics page",
	})).Name("metrics")

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("welcome 🙂")
	}).Name("Home")

	userroutes.UserRoutes(app)
	projectroutes.ProjectRoutes(app)

	fasthttpHandler := app.Handler()
	// fmt.Println(app.HandlersCount())
	// data, _ := json.MarshalIndent(app.Stack(), "", " ")
	// data, _ := json.MarshalIndent(app.GetRoute("register"), "", " ")
	// fmt.Println(string(data))

	fasthttpServer := &fasthttp.Server{
		Handler: fasthttpHandler,
	}

	if err := fasthttpServer.ListenAndServe(":3000"); err != nil {
		panic(err)
	}
}
