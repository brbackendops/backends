## Tweets API (Monolithic)

* Api - echo (go lang)
* pattern - repo
* database - postgres (sqlx)
* branch - staging / main (production)

### Modules

* [X]  user

  * [X]  register
  * [X]  login
  * [X]  followers
  * [X]  following
  * [X]  update
* [ ]  posts

  * [X]  paid
  * [X]  free
  * [X]  comments
  * [X]  likes
  * [X]  CRUD
  * [ ]  discount
* [ ]  coupons

  * [ ]  create
* [ ]  payment
* [ ]  purchase
* [ ]  Notification (real time) with redis pub sub / notification history saved to db with goroutines to reduce the latency issues
* [ ]  unit test
* [ ]  circle ci [ build , test , code linting ]
* [ ]  WishList
* [ ]  Docker
* [ ]  Kubernetes
