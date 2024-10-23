package cart

import (
	"net/http"

	"ecommerce/database"
	"ecommerce/middlewares"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type (
	Cart struct {
		db *sqlx.DB
	}

	CartHandlers interface {
		CartHomeHandler(w http.ResponseWriter, r *http.Request)
		CartCreateHandler(w http.ResponseWriter, r *http.Request)
		CartListHandler(w http.ResponseWriter, r *http.Request)
	}
)

func CartRouter() *mux.Router {
	cart := &Cart{
		db: database.MakeDbConnection(),
	}
	cartRouter := mux.NewRouter().PathPrefix("/cart").Subrouter()
	cartRouter.HandleFunc("/", cart.CartHomeHandler).Methods(http.MethodGet).Name("cartHome")

	cartRestrictedRouter := cartRouter.NewRoute().Subrouter()
	cartRestrictedRouter.Use(middlewares.Authenticate)
	cartRestrictedRouter.HandleFunc("/create", cart.CartCreateHandler).Methods(http.MethodPost).Name("cartCreate")
	cartRestrictedRouter.HandleFunc("/list", cart.CartListHandler).Methods(http.MethodGet).Name("cartList")

	return cartRouter
}

func (c *Cart) CartHomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("welcome to cart api "))
}
