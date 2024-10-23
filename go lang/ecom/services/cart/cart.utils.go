package cart

import (
	"encoding/json"
	"net/http"
)

type ErrorMessage struct {
	Message string
}

func (e *ErrorMessage) Send(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusInternalServerError)
	json.NewEncoder(w).Encode(e)
}

type CartResponse struct {
	Message string
}

type CartListResponse struct {
	Message string                   `json:"message"`
	Data    []map[string]interface{} `json:"data"`
}

func NewCartResponse(s string) *CartResponse {
	return &CartResponse{
		Message: s,
	}
}

func NewCartListResponse(s string, d []map[string]interface{}) *CartListResponse {
	return &CartListResponse{
		Message: s,
		Data:    d,
	}
}
