package usercontrollers

import (
	"encoding/json"
	"fmt"
	"os"
	"time"

	"project/database/types"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	h, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(h), err
}

func CompareHashPassword(password string, hashed string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))
	return err == nil
}

func SignToken(body types.User) (string, error) {
	generatedToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"payload": body,
		"exp":     time.Now().Add(time.Minute * 10).Unix(),
	})

	signToken, err := generatedToken.SignedString([]byte(os.Getenv("SECERET_KEY")))
	return signToken, err
}

type UserV struct {
	Id        int
	FirstName string
	LastName  string
	Email     string
	Age       int
}

type TokenError struct {
	Message string
}

func (e *TokenError) Error() string {
	return e.Message
}

func VerifyToken(tokenString string) (*UserV, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("error in token parsing")
		}
		return []byte(os.Getenv("SECERET_KEY")), nil
	})

	if !token.Valid || err != nil {
		return nil, &TokenError{
			Message: "token is invalid",
		}
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		payload := claims["payload"]
		jsonData, err := json.Marshal(payload)
		if err != nil {
			return nil, err
		}

		user := UserV{}
		if err := json.Unmarshal(jsonData, &user); err != nil {
			return nil, err
		}
		return &user, nil
	}

	// for key, value := range claims["payload"] {
	// 	fmt.Println("")
	// }
	return nil, &TokenError{
		Message: "Something Went Wrong",
	}
}
