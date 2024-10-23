package middlewares

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"ecommerce/database/types"

	"github.com/golang-jwt/jwt/v5"
)

type UserJwtInfoClaims struct {
	Id          int    `json:"id"`
	Username    string `json:"username"`
	Email       string `json:"email"`
	Age         int    `json:"age"`
	PhoneNumber *int   `json:"phone_number"`
	jwt.RegisteredClaims
}

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(".....")
		if r.Header.Get("Authorization") == "" {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("user is not authenticated"))
			return
		}

		reqToken := strings.Split(r.Header.Get("Authorization"), "Bearer ")[1]

		key := []byte(os.Getenv("SECRET_KEY"))
		claims := &UserJwtInfoClaims{}
		token, err := jwt.ParseWithClaims(reqToken, claims, func(t *jwt.Token) (interface{}, error) {
			return key, nil
		})
		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte("invalid token found"))
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("incorrect token found"))
			return
		}

		if !token.Valid {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("invalid token found"))
			return
		}

		user := types.UserCtxt{
			Id:          claims.Id,
			Username:    claims.Username,
			Email:       claims.Email,
			Age:         claims.Age,
			PhoneNumber: claims.PhoneNumber,
		}

		ctx := context.WithValue(r.Context(), "user", user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
