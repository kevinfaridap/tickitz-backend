<p align="center">

  <h3 align="center">Tickitz API</h3>
  <p align="center">
   <br />
   <image width="" src='https://user-images.githubusercontent.com/74039235/119124755-39d54300-ba5b-11eb-82f9-ab35478380c4.png' />
   <br />
   This Api is for Ticktiz. this application helps customers to purchase movie tickets easily and faster. They also can see
   <br />
    all the upcoming movies and now showing movies. We will add more features to help custumers soon.
  </p>



## Built With
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)

## Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](database-example.sql)

## ✏️ About

This is the repository Backend of the Bootcamp Arkademy task

#### User Endpoint

|  METHOD  |             API             |                    REMARKS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `POST`  |       /users/register       |      Register User and Activation Email       |
|  `POST`  |      /users/verify:email    |                Activation Email               |
|  `POST`  |        /users/login         |        Sign in with a verified email          |
|  `GET`   |        /users/:email        |          Get Profile by decoded email         |
|  `POST`  |       /users/updateimage    |               Update Image User               |
|  `GET`   |       /users/:userId        |              Get Data By userID               |
|  `GET`   |           /users            |               Get All Data User               |
|  `PUT`   |       /users/:userId        |              Edit Data By userID              |
| `DELETE` |       /users/:userId        |             Delete Data By userID             |


#### Movies Endpoint

|  METHOD  |             API             |                    REMARKS                   |
| :------: | :-------------------------: | :-------------------------------------------:|
|  `GET`   |            /movies/         |           Get All Now Showing Movies         |
|  `GET`   |          /movies/:id        |            Get Movies Details by Id          |
|  `POST`  |           /movies/          |            Create Movies For Admin           |
|  `PUT`   |          /movies/:id        |                 Update Movies                |
| `DELETE` |          /movies/:id        |               Delete Movie by id             |



## Installation

Clone this repository and then use the package manager npm to install dependencies.


```bash
npm install
```

## Setup .env example

Create .env file in your root project folder.

```env

DB_HOST = localhost
DB_ USER = root
DB = yourdatabase

```

## Run the app

Development mode

```bash
npm run dev
```

Deploy mode

```bash
npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.



># Visit Project
- :white_check_mark: [Frontend](https://github.com/kevinfaridap/tickitz-frontend)
- :rocket: [Ticktiz [Demo Aplikasi]](https://ticktiz-ticket.netlify.app/signin)
