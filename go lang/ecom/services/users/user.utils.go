package users

import (
	"encoding/json"
	"net/http"
)

type (
	ErrorResponse struct {
		Message string `json:"message"`
	}
)

func NewErrorResponse(message string) *ErrorResponse {
	return &ErrorResponse{
		Message: message,
	}
}

func (e *ErrorResponse) Send(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusBadRequest)
	json.NewEncoder(w).Encode(e)
}
