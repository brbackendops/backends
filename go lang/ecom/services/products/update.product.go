package products

import (
	"encoding/json"
	"net/http"
	"time"

	"ecommerce/database/types"

	"github.com/gorilla/mux"
)

func (p *Product) ProductUpdateHandler(w http.ResponseWriter, r *http.Request) {
	productBody := &types.ProductUpdateBody{}
	product := &types.Product{}
	product_id := mux.Vars(r)["id"]

	if r.ContentLength == 0 {
		errMsg := ErrorMessage{
			Message: "payload expected from user",
		}
		errMsg.Send(w)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(productBody); err != nil {
		errMsg := ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}
	// fmt.Printf("%#v \n", productBody)
	if err := p.db.Get(product, "SELECT * FROM products WHERE id=$1", product_id); err != nil {
		errMsg := ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	if productBody.Name == nil {
		productBody.Name = &product.Name
	}

	if productBody.Description == nil {
		productBody.Description = &product.Description
	}

	if productBody.InStock == nil {
		productBody.InStock = &product.InStock
	}

	if productBody.StockQuantity == nil {
		productBody.StockQuantity = &product.StockQuantity
	}

	if productBody.CategoryId == nil {
		productBody.CategoryId = &product.CategoryId
	}

	if productBody.Price == nil {
		productBody.Price = &product.Price
	}

	updatedTime := time.Now().UTC().Round(time.Microsecond)
	uQuery := "UPDATE products SET name=?,description=?,instock=?,stockquantity=?,category_id=?,price=?,updated_at=? WHERE id=?"
	_, err := p.db.Exec(p.db.Rebind(uQuery), *productBody.Name, *productBody.Description, *productBody.InStock, *productBody.StockQuantity, *productBody.CategoryId, *productBody.Price, updatedTime, product_id)
	if err != nil {
		errMsg := ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	data, err := json.Marshal(NewProductResponse("product successfully updated"))
	if err != nil {
		errMsg := ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(data)
}
