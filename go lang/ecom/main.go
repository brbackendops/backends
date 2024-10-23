package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	bridge "ecommerce/middlewares"

	cartRouter "ecommerce/services/cart"
	categoryRouter "ecommerce/services/category"
	productRouter "ecommerce/services/products"
	userRouter "ecommerce/services/users"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err.Error())
	}

	router := mux.NewRouter()

	router.Use(bridge.Logger)

	router.HandleFunc("/", HomeHandler)
	user := userRouter.UserRouter()
	product := productRouter.ProductRouter()
	category := categoryRouter.CategoryRouter()
	cart := cartRouter.CartRouter()

	router.PathPrefix("/users").Handler(user)
	router.PathPrefix("/category").Handler(category)
	router.PathPrefix("/products").Handler(product)
	router.PathPrefix("/cart").Handler(cart)

	router.PathPrefix("/images").Handler(http.StripPrefix("/images/", http.FileServer(http.Dir("./public/images/"))))
	server := &http.Server{
		Addr:         "0.0.0.0:4000",
		IdleTimeout:  time.Second * 15,
		ReadTimeout:  time.Second * 15,
		WriteTimeout: time.Second * 15,
		Handler:      router,
	}

	log.Fatal(server.ListenAndServe())
}

func HomeHandler(writer http.ResponseWriter, req *http.Request) {
	fmt.Fprint(writer, "welcome to ecommerce api")
}
