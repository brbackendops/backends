package notification

import "github.com/redis/go-redis/v9"

type Notification interface {
	CreateChannel(int) string
	PublishToChannel(int, string) *redis.IntCmd
	SubScribeToChannel(user_id int) *redis.PubSub
}
