package usercontrollers

import (
	"project/database"

	"github.com/jmoiron/sqlx"
)

var Db *sqlx.DB = database.ConnectDb()
