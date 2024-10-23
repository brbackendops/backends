package notification

import (
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

type NotifyRepo struct {
	DB      *sqlx.DB
	RClient *redis.Client
}

func NewNotifyRepo(db *sqlx.DB, rclient *redis.Client) *NotifyRepo {
	return &NotifyRepo{
		DB:      db,
		RClient: rclient,
	}
}

func (n *NotifyRepo) CreateChannel(user_id int) string {
	return fmt.Sprintf("user_notify_%d", user_id)
}

func (n *NotifyRepo) PublishToChannel(user_id int, msg string) *redis.IntCmd {
	return n.RClient.Publish(ctx, n.CreateChannel(user_id), msg)
}

func (n *NotifyRepo) SubScribeToChannel(user_id int) *redis.PubSub {
	return n.RClient.Subscribe(ctx, n.CreateChannel(user_id))
}
