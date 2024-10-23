package user

import (
	"errors"
	"time"
	"tweet/database/types"

	"github.com/golang-jwt/jwt/v5"
)

func (us *UserService) UserLogin(payload *types.UserLogin) (*string, error) {
	user, err := us.UserRepo.GetByEmail(payload.Email)
	if err != nil {
		return nil, err
	}

	ok := ComparePassword([]byte(user.Password), []byte(payload.Password))
	if !ok {
		return nil, errors.New("incorrect password")
	}

	expiredAt := time.Now().Add(15 * time.Minute)
	sKey := []byte("12738231y23hqekjwjeqeuqwieo")
	jwtClaims := UserJWTClaims{
		user.Id,
		user.Username,
		user.Email,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiredAt),
		},
	}

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwtClaims)
	token, err := t.SignedString(sKey)
	if err != nil {
		return nil, err
	}

	return &token, nil
}
