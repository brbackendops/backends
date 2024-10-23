package middlewares

import (
	"errors"
	"fmt"
	"tweet/database/types"
	uservice "tweet/services/user"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func DestructureJwtToken(reqToken string) (*uservice.UserJWTClaims, error) {

	key := []byte("12738231y23hqekjwjeqeuqwieo")
	claims := &uservice.UserJWTClaims{}
	token, err := jwt.ParseWithClaims(reqToken, claims, func(t *jwt.Token) (interface{}, error) {
		return key, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return nil, errors.New("invalid token found")
		}
	}

	if !token.Valid {
		return nil, errors.New("invalid token found")
	}
	return claims, nil
}

func Authenticate(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("cookie_token")

		if err != nil {
			fmt.Println(err)
			return err
		}

		claimed, err := DestructureJwtToken(cookie.Value)
		if err != nil {
			fmt.Println(err)
			return err
		}
		user := types.UserClaimed{
			Id:       claimed.Id,
			Username: claimed.Username,
			Email:    claimed.Email,
		}
		c.Set("user", user)
		return next(c)
	}
}
