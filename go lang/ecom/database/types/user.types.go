package types

type (
	User struct {
		Id          int    `db:"id" json:"id"`
		Username    string `db:"username" json:"username"`
		Email       string `db:"email" json:"email"`
		Password    string `db:"password" json:"password"`
		Age         int    `db:"age" json:"age"`
		PhoneNumber *int   `db:"phonenumber" json:"phone_number"`
		CreatedAt   string `db:"created_at"`
		UpdatedAt   string `db:"updated_at"`
	}

	UserRegister struct {
		Username    string `db:"username" json:"username"`
		Email       string `db:"email" json:"email"`
		Password    string `db:"password" json:"password"`
		Age         int    `db:"age" json:"age"`
		PhoneNumber *int   `db:"phoneNumber" json:"phone_number"`
	}

	UserCtxt struct {
		Id          int    `db:"id" json:"id"`
		Username    string `db:"username" json:"username"`
		Email       string `db:"email" json:"email"`
		Age         int    `db:"age" json:"age"`
		PhoneNumber *int   `db:"phoneNumber" json:"phone_number"`
	}
	UserLogin struct {
		Email    string `db:"email" json:"email"`
		Password string `db:"password" json:"password"`
	}

	UserUpdate struct {
		Username    *string `db:"username" json:"username"`
		Age         *int    `db:"age" json:"age"`
		PhoneNumber *int    `db:"phoneNumber" json:"phone_number"`
	}
)
