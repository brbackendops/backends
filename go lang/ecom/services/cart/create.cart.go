package cart

import (
	"encoding/json"
	"fmt"
	"net/http"

	"ecommerce/database/types"
)

func (c *Cart) CartCreateHandler(w http.ResponseWriter, r *http.Request) {
	cartBody := &types.CartPostBody{}
	product := &types.Product{}
	user := r.Context().Value("user").(types.UserCtxt)
	if r.ContentLength == 0 {
		errMsg := &ErrorMessage{
			Message: "no data to add",
		}
		errMsg.Send(w)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(cartBody); err != nil {
		errMsg := &ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}
	if err := c.db.Get(product, "SELECT * FROM products WHERE id=$1", cartBody.ProductId); err != nil {
		errMsg := &ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	if product.InStock == false {
		errMsg := &ErrorMessage{
			Message: "product out of stock",
		}
		errMsg.Send(w)
		return
	}

	if cartBody.Quantity > product.StockQuantity {
		count := product.StockQuantity - cartBody.Quantity
		errMsg := &ErrorMessage{
			Message: fmt.Sprintf("only %d left", count),
		}
		errMsg.Send(w)
		return
	}
	_, err := c.db.NamedExec("INSERT INTO cart (product_id,quantity,user_id) VALUES (:product_id,:quantity,:user_id)", map[string]interface{}{
		"product_id": cartBody.ProductId,
		"quantity":   cartBody.Quantity,
		"user_id":    user.Id,
	})
	if err != nil {
		errMsg := &ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	data, err := json.Marshal(NewCartResponse("successfully added to cart"))
	if err != nil {
		errMsg := &ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(data)

	defer c.db.Close()
}
