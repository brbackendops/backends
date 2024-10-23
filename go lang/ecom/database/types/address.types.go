package types

type (
	Address struct {
		Id        int    `db:"id" json:"id"`
		House     string `db:"house" json:"house"`
		Street    string `db:"street" json:"street"`
		City      string `db:"city" json:"city"`
		Pincode   int    `db:"pincode" json:"pincode"`
		UserId    int    `db:"userid" json:"user_id"`
		CreatedAt string `db:"created_at" json:"created_at"`
		UpdatedAt string `db:"updated_at" json:"updated_at"`
	}

	AddressRqstPost struct {
		House   string `db:"house" json:"house"`
		Street  string `db:"sreet" json:"street"`
		City    string `db:"city" json:"city"`
		Pincode int    `db:"pincode" json:"pincode"`
		UserId  int    `db:"userId" json:"user_id"`
	}

	AddressRqstUpdate struct {
		House   *string `db:"house" json:"house" validate:"required"`
		Street  *string `db:"sreet" json:"street"`
		City    *string `db:"city" json:"city"`
		Pincode *int    `db:"pincode" json:"pincode"`
		UserId  *int    `db:"userId" json:"user_id"`
	}
)
