package test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	user "ecommerce/services/users"

	"github.com/stretchr/testify/assert"
)

//"github.com/stretchr/testify/assert"
// testify/mock or go-mock

type MockDb struct {
	Username    string
	Password    string
	Email       string
	Age         int
	PhoneNumber *int
	CreatedAt   string
	UpdatedAt   string
}

func TestUserResgieterUnitTest(t *testing.T) {
	handler := user.NewUserHandler()
	validUser := struct {
		Username    string `json:"username"`
		Password    string `json:"password"`
		Email       string `json:"email"`
		Age         int    `json:"age"`
		PhoneNumber *int   `json:"phone_number"`
	}{
		Username:    "test01",
		Password:    "test01",
		Email:       "test@test.com",
		Age:         24,
		PhoneNumber: nil,
	}
	jsonData, err := json.Marshal(validUser)
	if err != nil {
		t.Fatal(err)
	}
	req := httptest.NewRequest(http.MethodPost, "/regsiter", bytes.NewReader(jsonData))
	req.Header.Set("Content-Type", "application/json") // Set content type

	w := httptest.NewRecorder()
	handler.UserRegisterHandler(w, req)
	res := w.Result()
	defer res.Body.Close()
	assert.Equal(t, http.StatusBadRequest, res.StatusCode, "Expected status code 400")
}
