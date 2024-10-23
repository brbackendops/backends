package products

import (
	"net/http"

	"ecommerce/database"
	"ecommerce/middlewares"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type (
	Product struct {
		db *sqlx.DB
	}

	ProductHandlers interface {
		ProductHomeHandler(w http.ResponseWriter, r *http.Request)
		ProductListHandler(w http.ResponseWriter, r *http.Request)
		ProductCreateHandler(w http.ResponseWriter, r *http.Request)
		ProductUpdateHandler(w http.ResponseWriter, r *http.Request)
		ProductDeleteHandler(w http.ResponseWriter, r *http.Request)
	}
)

func NewProduct() *Product {
	return &Product{
		db: database.MakeDbConnection(),
	}
}

func ProductRouter() *mux.Router {
	product := NewProduct()
	productRouter := mux.NewRouter().PathPrefix("/products").Subrouter()
	productRouter.HandleFunc("/", product.ProductHomeHandler).Methods(http.MethodGet).Name("productHome")

	productRestrictedRouter := productRouter.NewRoute().Subrouter()
	productRestrictedRouter.Use(middlewares.Authenticate)
	productRestrictedRouter.HandleFunc("/create", product.ProductCreateHandler).Methods(http.MethodPost).Name("productCreate")
	productRestrictedRouter.HandleFunc("/{id}/update", product.ProductUpdateHandler).Methods(http.MethodPatch).Name("productsUpdate")
	productRestrictedRouter.HandleFunc("/{id}/delete", product.ProductDeleteHandler).Methods(http.MethodDelete).Name("productsDelete")

	return productRouter
}

func (p *Product) ProductHomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("welcome to products api"))
}
