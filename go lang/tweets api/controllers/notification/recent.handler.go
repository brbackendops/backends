package notification

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/labstack/echo/v4"
)

func (nc *NotificationController) RecentNotificationHandler(c echo.Context) error {

	c.Response().Header().Set("Content-Type", "text/event-stream")
	c.Response().Header().Set("Cache-Control", "no-cache,no-transform")
	c.Response().Header().Set("Connection", "keep-alive")
	c.Response().Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")

	// user := c.Get("user").(types.UserClaimed)

	msgChan := make(chan string)

	go func() {
		pubsub := nc.Nservice.Subscribe(7)
		ctx, cancel := context.WithCancel(context.Background())
		defer close(msgChan)
		defer cancel()
		for {
			msg, err := pubsub.ReceiveMessage(ctx)
			if err != nil {
				fmt.Println(err.Error())
				cancel()
				return
			}
			msgChan <- msg.Payload
			time.Sleep(time.Second)
		}
	}()

	for {
		select {
		case msg := <-msgChan:
			var data map[string]interface{}
			if err := json.Unmarshal([]byte(msg), &data); err != nil {
				fmt.Println("error decoding messages", err.Error())
				continue
			}

			fmt.Println(msg)
			_, err := c.Response().Writer.Write([]byte(msg))
			if err != nil {
				fmt.Println(err.Error())
				return nil
			}
			c.Response().Flush()
		case <-c.Request().Context().Done():
			fmt.Println("Done")
			return nil
		}
	}
}
