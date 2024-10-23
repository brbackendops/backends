package category

import (
	"encoding/json"
	"net/http"
	"time"

	"ecommerce/database/types"

	"github.com/gorilla/mux"
)

func (c *Category) UpdateCategoryHandler(w http.ResponseWriter, r *http.Request) {
	categoryBody := &types.CategoryBodyUpdateType{}
	catId := mux.Vars(r)["id"]
	if err := json.NewDecoder(r.Body).Decode(categoryBody); err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	categoryType := &types.Category{}
	if err := c.db.Get(categoryType, "SELECT * FROM category WHERE id=$1", catId); err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	if categoryBody.Name == nil {
		categoryBody.Name = &categoryType.Name
	}

	if categoryBody.Description == nil {
		categoryBody.Description = &categoryType.Description
	}

	query := "UPDATE category SET name=?,description=?,created_at=? WHERE id=?"
	_, err := c.db.Exec(c.db.Rebind(query), categoryBody.Name, categoryBody.Description, time.Now().UTC().Round(time.Microsecond), catId)
	if err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	data, err := json.Marshal(NewCategoryResponse("category successfully updated "))
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
