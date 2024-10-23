package notification

import (
	"tweet/services/notification"
)

type NotificationController struct {
	Nservice *notification.NotificationService
}

func NewNotificationController(notifyservice *notification.NotificationService) *NotificationController {
	return &NotificationController{
		Nservice: notifyservice,
	}
}
