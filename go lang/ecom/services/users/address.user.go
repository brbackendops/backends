package users

import (
	"encoding/json"
	"net/http"
	"time"

	"ecommerce/database/types"

	"github.com/lib/pq"
)

type AddressResponse struct {
	Message string
}

func (u *User) UserAddAddress(w http.ResponseWriter, r *http.Request) {
	address := &types.AddressRqstPost{}
	userSigned := r.Context().Value("user").(types.UserCtxt)
	address.UserId = userSigned.Id
	if err := json.NewDecoder(r.Body).Decode(address); err != nil {
		errmsg := &ErrorResponse{
			Message: err.Error(),
		}
		errmsg.Send(w)
		return
	}

	_, err := u.db.NamedExec("INSERT INTO address (house,street,city,pincode,userId) VALUES (:house,:street,:city,:pincode,:userId)", map[string]interface{}{
		"house":   address.House,
		"street":  address.Street,
		"city":    address.City,
		"pincode": address.Pincode,
		"userId":  address.UserId,
	})
	if err != nil {
		if pgErr, ok := err.(*pq.Error); ok && pgErr.Code == "23505" {
			errmsg := &ErrorResponse{
				Message: "address alread created for this user , please update it if you need to apply any changes",
			}
			errmsg.Send(w)
			return
		}

		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	data, err := json.Marshal(&AddressResponse{
		Message: "address successfully created",
	})
	if err != nil {

		errmsg := &ErrorResponse{
			Message: err.Error(),
		}
		errmsg.Send(w)
		return
	}

	w.Write(data)
}

func (u *User) UserUpdateAddress(w http.ResponseWriter, r *http.Request) {
	userBody := &types.AddressRqstUpdate{}

	if r.ContentLength == 0 {
		errMsg := &ErrorResponse{
			Message: "no data to update",
		}
		errMsg.Send(w)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(userBody); err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}
	user := r.Context().Value("user").(types.UserCtxt)

	address := &types.Address{}
	if err := u.db.Get(address, "SELECT * FROM address WHERE userId = $1", user.Id); err != nil {
		errMsg := &ErrorResponse{
			Message: "address not found",
		}
		errMsg.Send(w)
		return
	}

	userBody.UserId = &user.Id
	if userBody.House == nil {
		userBody.House = &address.House
	}

	if userBody.City == nil {
		userBody.City = &address.City
	}

	if userBody.Street == nil {
		userBody.Street = &address.Street
	}

	if userBody.Pincode == nil {
		userBody.Pincode = &address.Pincode
	}

	updateQuery := "UPDATE address SET house=?,street=?,city=?,pincode=?,updated_at=? WHERE userId=?"
	_, err := u.db.Exec(u.db.Rebind(updateQuery), *userBody.House, *userBody.Street, *userBody.City, *userBody.Pincode, time.Now().UTC().Round(time.Microsecond), *userBody.UserId)
	if err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	data, err := json.Marshal(&AddressResponse{
		Message: "address successfully updated",
	})
	if err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	w.Write(data)
}
