package database

import (
	"fmt"
	"log"
	"os"

	"ecommerce/database/models"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func MakeDbConnection() *sqlx.DB {
	var url string
	if os.Getenv("LOCAL_DEV") == "true" {
		url = fmt.Sprintf("host=localhost user=%s password=%s dbname=%s sslmode=disable", os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))
	} else {
		url = fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable", os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))
	}
	db, err := sqlx.Connect("postgres", url)
	if err != nil {
		fmt.Println(err.Error())
		log.Fatal(err)
	}

	// transaction
	tx := db.MustBegin()
	tx.MustExec(models.Schema)
	tx.Commit()

	db.SetConnMaxIdleTime(5) // no need to establish new connection everytime instead it creates n times of read-to-use connection to handle incomming requests
	// elimiates need for establishing new connection each request
	db.SetMaxOpenConns(5) //
	fmt.Println("connection to database was successfull")
	return db
}
