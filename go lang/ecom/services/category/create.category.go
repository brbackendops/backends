package category

import (
	"encoding/json"
	"net/http"

	"ecommerce/database/types"
)

func (c *Category) CreateCategoryHandler(w http.ResponseWriter, r *http.Request) {
	categoryBody := &types.CategoryBodyType{}

	if r.ContentLength == 0 {
		errMsg := &ErrorResponse{
			Message: "no data to process",
		}
		errMsg.Send(w)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(categoryBody); err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	_, err := c.db.NamedExec("INSERT INTO category (name,description) VALUES (:Name,:Description) ", map[string]interface{}{
		"Name":        categoryBody.Name,
		"Description": categoryBody.Description,
	})
	if err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	res, err := json.Marshal(NewCategoryResponse("category successfully created !"))
	if err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(res)
}
