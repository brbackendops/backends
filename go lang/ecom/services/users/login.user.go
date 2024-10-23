package users

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"ecommerce/database/types"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type LoginResponse struct {
	Message string
	Token   string
}

func (u *User) LoginUserHandler(w http.ResponseWriter, r *http.Request) {
	user := &types.User{}
	user_login := &types.UserLogin{}
	if err := json.NewDecoder(r.Body).Decode(user_login); err != nil {
		errResponse := &ErrorResponse{
			Message: err.Error(),
		}
		errResponse.Send(w)
		return
	}

	p := struct {
		email string
	}{
		user_login.Email,
	}

	if err := u.db.Get(user, "SELECT * FROM users WHERE email=$1", p.email); err != nil {

		errResponse := &ErrorResponse{
			Message: "user with these email does not exists",
		}
		errResponse.Send(w)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(user_login.Password)); err != nil {
		errResponse := &ErrorResponse{
			Message: "invalid password found",
		}
		errResponse.Send(w)
		return
	}

	expirationTime := time.Now().Add(30 * time.Minute)
	sKey := []byte(os.Getenv("SECRET_KEY"))

	jwtInfo := &UserJwtInfoClaims{
		user.Id,
		user.Username,
		user.Email,
		user.Age,
		user.PhoneNumber,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwtInfo)
	tokenString, err := token.SignedString(sKey)
	if err != nil {
		errResponse := &ErrorResponse{
			Message: err.Error(),
		}
		errResponse.Send(w)
		return
	}

	data, err := json.Marshal(LoginResponse{
		Message: "user logged in successfully",
		Token:   tokenString,
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// var userCtx types.UserCtxt = r.Context().Value("user").(types.UserCtxt)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(data)
}
