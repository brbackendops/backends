package users

import (
	"encoding/json"
	"net/http"

	"ecommerce/database/types"

	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

func (u *User) UserRegisterHandler(w http.ResponseWriter, r *http.Request) {
	user_payload := &types.UserRegister{}
	if err := json.NewDecoder(r.Body).Decode(user_payload); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user_payload.Password), 10)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	user_payload.Password = string(hashedPassword)
	_, dberr := u.db.NamedExec("INSERT INTO users (username,email,password,age,phoneNumber) VALUES (:username,:email,:password,:age,:phoneNumber)", user_payload)

	if dberr != nil {
		if pqError, ok := dberr.(*pq.Error); ok && pqError.Code.Name() == "unique_violation" {
			http.Error(w, "email already exists", http.StatusBadRequest)
			return
		}
		http.Error(w, dberr.Error(), http.StatusInternalServerError)
		return
	}

	data, err := json.Marshal(&user_payload)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(data)
}
