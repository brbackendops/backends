package redis

import (
	"fmt"

	"github.com/redis/go-redis/v9"
)

func ConnectRedis() *redis.Client {
	rClient := redis.NewClient(&redis.Options{
		Addr:     "redis-16633.c9.us-east-1-4.ec2.redns.redis-cloud.com:16633",
		Password: "pPh19jUMGJnxxXvD9EuOJAjQNFzsA814",
		DB:       0,
	})

	fmt.Println("Connected to redis successfully")
	return rClient
}
