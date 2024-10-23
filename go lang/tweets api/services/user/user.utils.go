package user

import "golang.org/x/crypto/bcrypt"

func HashMyPassword(plain []byte) ([]byte, error) {
	hashed, err := bcrypt.GenerateFromPassword(plain, 10)
	if err != nil {
		return nil, err
	}

	return hashed, nil
}

func ComparePassword(hashed []byte, plain []byte) bool {
	err := bcrypt.CompareHashAndPassword(hashed, plain)
	return err == nil
}
