package types

type (
	Post struct {
		Id        int     `db:"id" json:"id"`
		Title     string  `db:"title" json:"title"`
		Content   string  `db:"content" json:"content"`
		UserId    int     `db:"user_id" json:"user_id"`
		Type      string  `db:"type" json:"type"`
		Price     float64 `db:"price" json:"price"`
		CreatedAt string  `db:"created_at" json:"created_at"`
		UpdatedAt string  `db:"updated_at" json:"updated_at"`
	}

	PostBody struct {
		Title   string  `db:"title" json:"title"`
		Content string  `db:"content" json:"content"`
		UserId  int     `db:"user_id" json:"user_id"`
		Type    string  `db:"type" json:"type"`
		Price   float64 `db:"price" json:"price"`
	}

	PostUpdateBody struct {
		Title   *string  `db:"title" json:"title"`
		Content *string  `db:"content" json:"content"`
		Type    *string  `db:"type" json:"type"`
		Price   *float64 `db:"price" json:"price"`
	}

	Comment struct {
		Id      int    `db:"id" json:"id"`
		Content string `db:"content" json:"content"`
		UserId  int    `db:"user_id" json:"user_id"`
		PostId  int    `db:"post_id" json:"post_id"`
	}

	CommentBody struct {
		Content string `db:"content" json:"content"`
		UserId  int    `db:"user_id" json:"user_id"`
		PostId  int    `db:"post_id" json:"post_id"`
	}

	Like struct {
		Id        int    `db:"id" json:"id"`
		UserId    int    `db:"user_id" json:"user_id"`
		PostId    int    `db:"post_id" json:"post_id"`
		CreatedAt string `db:"created_at" json:"created_at"`
		UpdatedAt string `db:"updated_at" json:"updated_at"`
	}

	LikeBody struct {
		UserId int `db:"user_id" json:"user_id"`
		PostId int `db:"post_id" json:"post_id"`
	}
)
