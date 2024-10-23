package category

import (
	"encoding/json"
	"net/http"
)

type CategoryResponse struct {
	Data string
}

func NewCategoryResponse(res string) *CategoryResponse {
	return &CategoryResponse{
		Data: res,
	}
}

type ErrorResponse struct {
	Message string
}

func (e *ErrorResponse) Send(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusBadRequest)
	json.NewEncoder(w).Encode(e)
}
