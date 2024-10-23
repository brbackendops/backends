package test

import (
	"net/http"
	"testing"

	"github.com/gavv/httpexpect/v2"
)

// interaction test or integration test

func TestUserHome(t *testing.T) {
	e := httpexpect.Default(t, "http://127.0.0.1:4000/users")
	e.GET("/").
		Expect().
		Status(http.StatusOK)
}

func TestUserRegister(t *testing.T) {
	e := httpexpect.Default(t, "http://127.0.0.1:4000/users")
	data := map[string]interface{}{
		"username":     "test01",
		"password":     "test01",
		"email":        "test@test.com",
		"age":          24,
		"phone_number": nil,
	}

	// already exists
	e.POST("/register").
		WithJSON(data).
		Expect().
		Status(http.StatusBadRequest)
}

func TestUserLogin(t *testing.T) {
	e := httpexpect.Default(t, "http://127.0.0.1:4000/users")
	data := map[string]interface{}{
		"email":    "test@test.com",
		"password": "test01",
	}
	e.POST("/login").
		WithJSON(data).
		Expect().
		Status(http.StatusCreated)
}
