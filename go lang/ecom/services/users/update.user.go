package users

import (
	"encoding/json"
	"fmt"
	"net/http"

	"ecommerce/database/types"
)

type Response struct {
	Message string
}

func (u *User) UserUpdateProfile(w http.ResponseWriter, r *http.Request) {
	fmt.Println("modified since ", w.Header().Get("Last-Modified"))
	userBody := &types.UserUpdate{}

	if err := json.NewDecoder(r.Body).Decode(userBody); err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}

		errMsg.Send(w)
		return
	}

	user := r.Context().Value("user").(types.UserCtxt)
	userType := &types.User{}
	if err := u.db.Get(userType, "SELECT * FROM users WHERE id=$1", user.Id); err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}

		errMsg.Send(w)
		return
	}

	if userBody.Username == nil {
		userBody.Username = &userType.Username
	}

	if userBody.Age == nil {
		userBody.Age = &userType.Age
	}

	if userBody.PhoneNumber == nil {
		userBody.PhoneNumber = userType.PhoneNumber
	}

	query := "UPDATE users SET username=?,age=?,phoneNumber=? WHERE id=?"
	_, err := u.db.Exec(u.db.Rebind(query), *userBody.Username, *userBody.Age, *userBody.PhoneNumber, userType.Id)
	if err != nil {
		fmt.Println("say hi")
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}

		errMsg.Send(w)
		return
	}

	data, err := json.Marshal(&Response{
		Message: "user details successfully updated",
	})
	if err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}

		errMsg.Send(w)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	// max-age=3600,no-cache,private,must-relvalidate: for one time if res is at stale state;
	w.Header().Set("Cache-Control", "private,no-cache,max-age=3600")
	// w.Header().Set("Last-Modified", time.Now().UTC().String())
	// w.Header().Set("ETag", string(md5.New().Sum([]byte(fmt.Sprintf("%v", data)))))
	w.WriteHeader(http.StatusAccepted)
	w.Write(data)
}
