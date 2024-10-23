package types

type (
	User struct {
		Id        int    `db:"id"`
		FirstName string `db:"first_name"`
		LastName  string `db:"last_name"`
		Email     string `db:"email"`
		Age       *int   `db:"age"`
		Password  string `db:"password"`
	}

	UserAll struct {
		Id        int    `db:"id"`
		FirstName string `db:"first_name"`
		LastName  string `db:"last_name"`
		Email     string `db:"email"`
		Age       *int   `db:"age"`
	}

	Project struct {
		Id          int    `db:"id"`
		Name        string `db:"name"`
		Description string `db:"description"`
		IsActive    bool   `db:"is_active"`
		UserId      int    `db:"user_id"`
		Image       string `db:"image"`
		CreatedAt   string `db:"created_at"`
		UpdatedAt   string `db:"updated_at"`
	}
)
