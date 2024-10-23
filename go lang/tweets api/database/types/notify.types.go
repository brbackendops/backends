package types

type (
	Notification struct {
		Id           int    `db:"id" json:"id"`
		UserId       int    `db:"user_id" json:"user_id"`
		FromUserId   int    `db:"from_user_id" json:"from_user_id"`
		FromUsername string `db:"from_username" json:"from_username"`
		Message      string `db:"message" json:"message"`
		ReadStatus   bool   `db:"read_status" json:"read_status"`
		CreatedAt    string `db:"created_at" json:"created_at"`
	}

	NotificationMessage struct {
		UserId       int    `db:"user_id" json:"user_id"`
		FromUserId   int    `db:"from_user_id" json:"from_user_id"`
		FromUsername string `db:"from_username" json:"from_username"`
		Message      string `db:"message" json:"message"`
		ReadStatus   bool   `db:"read_status" json:"read_status"`
	}
)
