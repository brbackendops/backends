package types

type (
	User struct {
		Id        int    `db:"id" json:"id"`
		Username  string `db:"username" json:"username"`
		Password  string `db:"password" json:"password"`
		Email     string `db:"email" json:"email"`
		CreatedAt string `db:"created_at" json:"created_at"`
		UpdatedAt string `db:"updated_at" json:"updated_at"`
	}

	UserLogin struct {
		Email    string `db:"email" json:"email"`
		Password string `db:"password" json:"password"`
	}

	UserClaimed struct {
		Id       int    `db:"id" json:"id"`
		Username string `db:"username" json:"username"`
		Password string `db:"password" json:"password"`
		Email    string `db:"email" json:"email"`
	}
	UserCreate struct {
		Username string `db:"username" json:"username"`
		Password string `db:"password" json:"password"`
		Email    string `db:"email" json:"email"`
	}

	UserUpdate struct {
		Username *string `db:"username" json:"username"`
		Email    *string `db:"email" json:"email"`
	}

	UserFollowerBody struct {
		LeaderId   int `db:"leader_id" json:"leaderId"`
		FollowerId int `db:"follower_id" json:"follower_id"`
	}

	UserFollowingBody struct {
		FollowingId int `db:"follower_id" json:"following_id"`
	}

	UserFolowersCount struct {
		Count    int `db:"count" json:"count"`
		LeaderId int `db:"leader_id" json:"leader_id"`
	}

	GetUserFollow struct {
		LeaderId int    `db:"leader_id" json:"leader_id"`
		Username string `db:"username" json:"username"`
	}
)
