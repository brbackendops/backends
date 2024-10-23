package products

import (
	"encoding/json"
	"net/http"

	"ecommerce/database/types"

	"github.com/gorilla/mux"
)

func (p *Product) ProductDeleteHandler(w http.ResponseWriter, r *http.Request) {
	product_id := mux.Vars(r)["id"]
	product := &types.Product{}
	if err := p.db.Get(product, "SELECT * FROM products WHERE id=$1", product_id); err != nil {
		errMsg := ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	dQuery := "DELETE FROM products WHERE id=?"
	_, err := p.db.Exec(p.db.Rebind(dQuery), product_id)
	if err != nil {
		errMsg := ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	data, err := json.Marshal(NewProductResponse("product successfully deleted"))
	if err != nil {
		errMsg := ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	w.Write(data)
}
