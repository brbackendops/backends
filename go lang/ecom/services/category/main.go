package category

import (
	"net/http"

	"ecommerce/database"
	"ecommerce/middlewares"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type (
	Category struct {
		db *sqlx.DB
	}

	CategoryHandlers interface {
		CategoryHomeHandler(w http.ResponseWriter, r *http.Request)
		ListCategoryHandler(w http.ResponseWriter, r *http.Request)
		CreateCategoryHandler(w http.ResponseWriter, r *http.Request)
		UpdateCategoryHandler(w http.ResponseWriter, r *http.Request)
		DeleteCatgeoryHandler(w http.ResponseWriter, r *http.Request)
	}
)

func Newcategory() *Category {
	return &Category{
		db: database.MakeDbConnection(),
	}
}

func CategoryRouter() *mux.Router {
	category := Newcategory()
	categoryRouter := mux.NewRouter().PathPrefix("/category").Subrouter()
	categoryRouter.HandleFunc("/", category.CategoryHomeHandler).Methods(http.MethodGet).Name("home")

	categoryRestrictedRouter := categoryRouter.NewRoute().Subrouter()
	categoryRestrictedRouter.Use(middlewares.Authenticate)
	categoryRestrictedRouter.HandleFunc("/create", category.CreateCategoryHandler).Methods(http.MethodPost).Name("categoryCreate")
	categoryRestrictedRouter.HandleFunc("/{id}/update", category.UpdateCategoryHandler).Methods(http.MethodPatch).Name("categoryUpdate")
	categoryRestrictedRouter.HandleFunc("/{id}/delete", category.DeleteCatgeoryHandler).Methods(http.MethodDelete).Name("categoryDelete")
	categoryRestrictedRouter.HandleFunc("/list", category.ListCategoryHandler).Methods(http.MethodGet).Name("categoryList")
	return categoryRouter
}

func (c *Category) CategoryHomeHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("welcome to category api"))
}
