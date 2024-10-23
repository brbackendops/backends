package routes

import (
	postControl "tweet/controllers/post"
	"tweet/database"
	"tweet/database/redis"
	"tweet/middlewares"
	postRepo "tweet/repository/post"
	postService "tweet/services/post"

	"github.com/labstack/echo/v4"
)

func NewPostRoute(e *echo.Echo) {
	post := e.Group("/posts")
	post.Use(middlewares.Authenticate)
	db := database.ConnectDb()
	redis := redis.ConnectRedis()
	postrepo := postRepo.NewPostRepo(db, redis)
	postservice := postService.NewPostService(postrepo)
	postcontroller := postControl.NewPostController(*postservice)
	post.POST("/create", postcontroller.CreatePostHandler)
	post.PATCH("/:id/update", postcontroller.UpdatePostHandler)
	post.GET("/:id", postcontroller.GetHandlerPost)
	post.DELETE("/delete", postcontroller.DeletePostHandler)
	post.POST("/:id/comment", postcontroller.CreateCommentHandler)
	post.POST("/like", postcontroller.CreateLikeHandler)
}
