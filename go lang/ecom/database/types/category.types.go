package types

type (
	Category struct {
		Id          int    `db:"id" json:"id"`
		Name        string `db:"name" json:"name"`
		Description string `db:"description" json:"description"`
		CreatedAt   string `db:"created_at" json:"created_at"`
		UpdatedAt   string `db:"updated_at" json:"updated_at"`
	}

	CategoryBodyType struct {
		Name        string `db:"name" json:"name"`
		Description string `db:"description" json:"description"`
		CreatedAt   string `db:"created_at" json:"created_at"`
		UpdatedAt   string `db:"updated_at" json:"updated_at"`
	}

	CategoryBodyUpdateType struct {
		Name        *string `db:"name" json:"name"`
		Description *string `db:"description" json:"description"`
	}
)
