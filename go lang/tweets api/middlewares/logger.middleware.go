package middlewares

import (
	"fmt"
	"time"

	"github.com/labstack/echo/v4"
)

func Logger(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		start := time.Now()
		err := next(c)
		end := time.Now()
		fmt.Printf("%s %s %s \n", c.Request().Method, c.Path(), end.Sub(start))
		return err
	}
}
