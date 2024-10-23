package routes

import (
	notifyControl "tweet/controllers/notification"
	"tweet/database"
	"tweet/database/redis"
	notifyRepo "tweet/repository/notification"
	notifyService "tweet/services/notification"

	"github.com/labstack/echo/v4"
)

func NewNotificationRoute(e *echo.Echo) {
	notify := e.Group("/notifications")
	// notify.Use(middlewares.Authenticate)
	db := database.ConnectDb()
	redis := redis.ConnectRedis()
	notifyrepo := notifyRepo.NewNotifyRepo(db, redis)
	notifyservice := notifyService.NewNotificationService(notifyrepo)
	notifycontroller := notifyControl.NewNotificationController(notifyservice)
	notify.GET("/recent", notifycontroller.RecentNotificationHandler)
}
