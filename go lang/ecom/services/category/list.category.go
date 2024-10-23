package category

import (
	"encoding/json"
	"net/http"
)

type listResponse struct {
	Message string
	Data    []map[string]interface{}
}

func (c *Category) ListCategoryHandler(w http.ResponseWriter, r *http.Request) {
	catArr := []map[string]interface{}{}
	rows, err := c.db.Queryx("SELECT * FROM category")
	if err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	defer rows.Close()
	for rows.Next() {
		cols, _ := rows.SliceScan()
		catArr = append(catArr, map[string]interface{}{
			"id":          cols[0],
			"name":        cols[1],
			"description": cols[2],
			"created_at":  cols[3],
			"updated_at":  cols[4],
		})
	}

	data, err := json.Marshal(&listResponse{
		Message: "successfull",
		Data:    catArr,
	})
	if err != nil {
		errMsg := &ErrorResponse{
			Message: err.Error(),
		}
		errMsg.Send(w)
		return
	}

	w.Header().Set("Cache-Control", "private,no-cache,max-age=3600")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
