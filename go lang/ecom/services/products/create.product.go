package products

import (
	"encoding/json"
	"net/http"

	"ecommerce/database/types"
)

func (p *Product) ProductCreateHandler(w http.ResponseWriter, r *http.Request) {
	productBody := &types.ProductBody{}
	category := &types.Category{}
	if err := json.NewDecoder(r.Body).Decode(productBody); err != nil {
		errMsg := &ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	user := r.Context().Value("user").(types.UserCtxt)
	if err := p.db.Get(category, "SELECT * FROM category WHERE id=$1", productBody.CategoryId); err != nil {
		errMsg := &ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}
	_, err := p.db.NamedExec("INSERT INTO products (name,description,inStock,stockQuantity,seller,category_id) VALUES (:name,:description,:inStock,:stockQuantity,:seller,:category_id)", map[string]interface{}{
		"name":          productBody.Name,
		"description":   productBody.Description,
		"inStock":       productBody.InStock,
		"stockQuantity": productBody.StockQuantity,
		"seller":        user.Id,
		"category_id":   productBody.CategoryId,
	})
	if err != nil {
		errMsg := &ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	data, err := json.Marshal(NewProductResponse("product successfully created"))
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
}
