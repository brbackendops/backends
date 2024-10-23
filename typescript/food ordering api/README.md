# Food Delivery Api ( express + typescript + repo pattern + MikroOrm / github actions / docker / kuber8s / Unit Tests )

* [X]  Express setup with typescript
* [X]  MikroOrm setup for postgresql
* [X]  user
  * [X]  create
  * [X]  login
  * [X]  auth
  * [X]  update
* [X]  multer for storing images
* [X]  restaurent (  one to one with user )
  * [X]  create
  * [X]  update
  * [X]  get
* [X]  menus
  * [X]  create
  * [X]  update
  * [X]  get
  * [X]  get all under a restaurent
* [ ]  implementing search for restaurent
  * [ ]  based on city
  * [ ]  based on selected cuisines
  * [ ]  sort
    * [ ]  latest with last updated
    * [ ]  delivery price
    * [ ]  estimated time
* [ ]  cart
  * [ ]  [ menuItemId , name , quantity ]
* [ ]  order
  * [ ]  deliveryDetails : [   email , name , addressLine1 , city ]
  * [ ]  cart
  * [ ]  restaurentId
