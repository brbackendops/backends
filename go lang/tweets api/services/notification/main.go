package notification

import (
	"context"
	"tweet/repository/notification"

	"github.com/redis/go-redis/v9"
)

type NotificationService struct {
	NotifyRepo notification.Notification
}

func NewNotificationService(notifyrepo notification.Notification) *NotificationService {
	return &NotificationService{
		NotifyRepo: notifyrepo,
	}
}

var ctx = context.Background()

func (ns *NotificationService) Subscribe(user_id int) *redis.PubSub {
	sub := ns.NotifyRepo.SubScribeToChannel(user_id)
	return sub
}
