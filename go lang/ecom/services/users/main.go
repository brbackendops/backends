package users

import (
	"fmt"
	"net/http"

	"ecommerce/database"
	middle "ecommerce/middlewares"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type (
	User struct {
		db *sqlx.DB
	}

	userService interface {
		UserHomeHandler(w http.ResponseWriter, r *http.Request)
		UserRegisterHandler(w http.ResponseWriter, r *http.Request)
		UserLoginHandler(w http.ResponseWriter, r *http.Request)
		UserAddAddress(w http.ResponseWriter, r *http.Request)
		UserUpdateProfile(w http.ResponseWriter, r *http.Request)
		UserUpdateAddress(w http.ResponseWriter, r *http.Request)
	}

	UserJwtInfoClaims struct {
		Id          int    `json:"id"`
		Username    string `json:"username"`
		Email       string `json:"email"`
		Age         int    `json:"age"`
		PhoneNumber *int   `json:"phone_number"`
		jwt.RegisteredClaims
	}
)

func NewUserHandler() *User {
	return &User{
		db: &sqlx.DB{},
	}
}

func UserRouter() *mux.Router {
	user := &User{
		db: database.MakeDbConnection(),
	}

	userRouter := mux.NewRouter().PathPrefix("/users").Subrouter()
	userRouter.HandleFunc("/", user.UserHomeHandler).Methods(http.MethodGet).Name("userHome")
	userRouter.HandleFunc("/register", user.UserRegisterHandler).Methods(http.MethodPost).Name("userRegister")
	userRouter.HandleFunc("/login", user.LoginUserHandler).Methods(http.MethodPost).Name("userLogin")

	userRestrictedRouter := userRouter.Methods(http.MethodPost).Subrouter()
	userRestrictedRouter.Use(middle.Authenticate)
	userRestrictedRouter.HandleFunc("/create/address", user.UserAddAddress).Name("userCreateAddress")
	userRestrictedRouter.HandleFunc("/update/address", user.UserUpdateAddress).Name("userUpdateAddress")
	userRestrictedRouter.HandleFunc("/update/profile", user.UserUpdateProfile).Name("userUpdateProfile")

	return userRouter
}

func (u *User) UserHomeHandler(writer http.ResponseWriter, req *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
	fmt.Fprint(writer, "welcome to users api")
}
