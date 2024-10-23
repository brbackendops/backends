package types

type (
	Cart struct {
		Id        int    `db:"id" json:"id"`
		ProductId int    `db:"product_id" json:"product_id"`
		UserId    int    `db:"user_id" json:"user_id"`
		Quantity  int    `db:"quantity" json:"quantity"`
		CreatedAt string `db:"created_at" json:"created_at"`
		UpdatedAt string `db:"updated_at" json:"updated_at"`
	}

	CartPostBody struct {
		ProductId int `db:"product_id" json:"product_id"`
		Quantity  int `db:"quantity" json:"quantity"`
	}

	CartUpdateBody struct {
		Quantity *int `db:"quantity" json:"quantity"`
	}

	CartList struct {
		ProductId     int     `db:"product_id" json:"product_id"`
		CartId        int     `db:"cart_id" json:"cart_id"`
		Name          string  `db:"name" json:"name"`
		InStock       bool    `db:"instock" json:"in_stock"`
		StockQuantity int     `db:"stockquantity" json:"stock_quantity"`
		CategoryId    int     `db:"category_id" json:"category_id"`
		Price         float64 `db:"price" json:"price"`
		Quantity      int     `db:"quantity" json:"quantity"`
		CreatedAt     string  `db:"created_at" json:"created_at"`
		UpdatedAt     string  `db:"updated_at" json:"updated_at"`
	}
)
