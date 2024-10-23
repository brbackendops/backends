package database

import (
	"log"
	"tweet/database/models"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func ConnectDb() *sqlx.DB {
	db, err := sqlx.Open("postgres", "user=postgres password=password dbname=tweet_go sslmode=disable")
	if err != nil {
		log.Fatal(err.Error())
	}

	tx := db.MustBegin()
	db.MustExec(models.Schema)
	tx.Commit()
	return db
}
