package routes

import (
	usercontroller "tweet/controllers/user"
	"tweet/database"
	"tweet/database/redis"
	"tweet/middlewares"
	userrepo "tweet/repository/user"
	userService "tweet/services/user"

	"github.com/labstack/echo/v4"
)

func UserRoute(e *echo.Echo) {
	user := e.Group("/users")
	db := database.ConnectDb()
	rclient := redis.ConnectRedis()
	urepo := userrepo.NewUserRepo(db, rclient)
	uService := userService.NewUserService(urepo)
	uController := usercontroller.NewUserController(*uService)
	user.POST("/register", uController.RegisterHandler)
	user.POST("/login", uController.UserLoginHandler)
	user.PATCH("/update", uController.UserUpdateProfile, middlewares.Authenticate)
	user.POST("/followers", uController.CreateFollowers, middlewares.Authenticate)
	user.POST("/following", uController.CreateUserFollowings, middlewares.Authenticate)
	user.GET("/count/followers", uController.CountFollowersHandler, middlewares.Authenticate)
	user.GET("/count/followings", uController.CountFollowingssHandler, middlewares.Authenticate)
}
