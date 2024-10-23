package types

type (
	Product struct {
		Id            int     `db:"id" json:"id"`
		Name          string  `db:"name" json:"name"`
		Description   string  `db:"description" json:"description"`
		Price         float64 `db:"price" json:"price"`
		InStock       bool    `db:"instock" json:"in_stock"`
		StockQuantity int     `db:"stockquantity" json:"stock_quantity"`
		Seller        int     `db:"seller" json:"seller"`
		CategoryId    int     `db:"category_id" json:"category_id"`
		CreatedAt     string  `db:"created_at" json:"created_at"`
		UpdatedAt     string  `db:"updated_at" json:"updated_at"`
	}

	ProductBody struct {
		Name          string  `db:"name" json:"name"`
		Description   string  `db:"description" json:"description"`
		Price         float64 `db:"price" json:"price"`
		InStock       bool    `db:"instock" json:"in_stock"`
		StockQuantity int     `db:"stockquantity" json:"stock_quantity"`
		Seller        int     `db:"seller" json:"seller"`
		CategoryId    int     `db:"category_id" json:"category_id"`
	}

	ProductUpdateBody struct {
		Name          *string  `db:"name" json:"name"`
		Description   *string  `db:"description" json:"description"`
		Price         *float64 `db:"price" json:"price"`
		InStock       *bool    `db:"instock" json:"in_stock"`
		StockQuantity *int     `db:"stockquantity" json:"stock_quantity"`
		CategoryId    *int     `db:"category_id" json:"category_id"`
	}
)
