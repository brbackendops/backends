package products

import (
	"encoding/json"
	"net/http"
)

type ErrorMessage struct {
	Message string
}

type ProductResponse struct {
	Message string
}

func NewProductResponse(res string) *ProductResponse {
	return &ProductResponse{
		Message: res,
	}
}

func (e *ErrorMessage) Send(w http.ResponseWriter) {
	w.WriteHeader(http.StatusBadRequest)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(e)
}
