package cart

import (
	"encoding/json"
	"log"
	"net/http"

	"ecommerce/database/types"
)

func (c *Cart) CartListHandler(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value("user").(types.UserCtxt)
	cart := &types.Cart{}
	if err := c.db.Get(cart, "SELECT * FROM cart WHERE user_id=$1", user.Id); err != nil {
		errMsg := &ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	cartLists := []map[string]interface{}{}
	clQuery := `
		SELECT p.id as product_id, c.id as cart_id, p.name, p.instock, p.stockquantity, p.category_id, p.price, c.quantity, p.created_at, p.updated_at
		FROM cart as c
		INNER JOIN products as p ON p.id = c.product_id
		WHERE c.user_id = $1
		ORDER BY c.id DESC	
	`
	rows, err := c.db.Queryx(clQuery, user.Id)
	if err != nil {
		errMsg := &ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	for rows.Next() {

		cartList := &types.CartList{}
		if err := rows.StructScan(cartList); err != nil {
			errMsg := &ErrorMessage{
				Message: err.Error(),
			}
			errMsg.Send(w)
			log.Println(err.Error())
			return
		}
		cartListD := map[string]interface{}{
			"product_id":     cartList.ProductId,
			"cart_id":        cartList.CartId,
			"name":           cartList.Name,
			"in_stock":       cartList.InStock,
			"stock_quantity": cartList.StockQuantity,
			"price":          cartList.Price,
			"quantity":       cartList.Quantity,
			"created_at":     cartList.CreatedAt,
			"updated_at":     cartList.UpdatedAt,
		}
		cartLists = append(cartLists, cartListD)
	}

	if err := rows.Err(); err != nil {
		errMsg := &ErrorMessage{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}
	rows.Close()
	data, err := json.Marshal(NewCartListResponse("success", cartLists))

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
	defer c.db.Close()
}
