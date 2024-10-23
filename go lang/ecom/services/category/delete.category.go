package category

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func (c *Category) DeleteCatgeoryHandler(w http.ResponseWriter, r *http.Request) {
	catId := mux.Vars(r)["id"]
	query := "Delete from category where id=?"
	_, err := c.db.Exec(c.db.Rebind(query), catId)
	if err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	data, err := json.Marshal(NewCategoryResponse("category successfully deleted"))
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
