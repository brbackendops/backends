package database

import (
	"fmt"
	"log"
	"project/database/models"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func ConnectDb() *sqlx.DB {
	db, err := sqlx.Connect("postgres", "user=postgres password=password dbname=projects sslmode=disable")
	if err != nil {
		log.Fatalln(err)
	}

	db.MustExec(models.Schema)

	fmt.Println("connecting to database was successfull")
	return db
}
