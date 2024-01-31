# quiz-game
Project for W.T course

---

## Description:
Online quiz game where users can compete in real-time by answering questions across various categories. 

## Functionalities:
Players can register, log in, join game sessions, answer questions within a time limit, and earn points based on correct answers. The game should include features like randomized questions, real-time score updates, and a leaderboard displaying the top players.

## Technology Stack:
Frontend: HTML, CSS, JavaScript for creating an interactive user interface
Backend: NodeJS + Express.js 
Database: MongoDB / MySQL for storing user data, questions, and game-related information

---

## How to run it: 
This project uses a .env file for some configuration parameters, make sure it contains this headers and complete the rest with your data:

```
PORT=9000
MONGODB_USER= ...
MONGODB_PASSWORD= ...
MONGODB_DB= test
MONGODB_SERVER= ...
MONGODB_SERVER_LOCAL=localhost
MONGODB_URL_LOCAL=mongodb
MONGODB_URL=mongodb+srv
MONGODB_PORT_LOCAL=27017
JWT_SECRET= ...
JWT_EXPIRATION= ...
TOKEN_TRIVIA_API= ...
URL_TRIVIA_API=https://opentdb.com/api.php
URL_RESET_TOKEN=https://opentdb.com/api_token.php?command=reset&token=
URL_NEW_TOKEN=https://opentdb.com/api_token.php?command=request
```

Download the dependecies for the project 
``` javascript
	npm install

```
### Running in local enviroment:

If you want to execute the app in a local enviroment, instead of using mongodb cloud (mongodb atlas) you can use the files from the ```docker``` folder:

``` bash
├── docker
│   ├── docker-compose.yaml #file to deploy the container () 
│   └── init
│       └── init-script.js #initial script to create and populate with data
```

Make sure to run first the script in the root folder named ```run-local-mongodb.sh``` because it will check for a ```.env``` file whith the required parameters and finally it will generate the container with the database running in background,

``` bash
	./run-local-mongodb.sh 
```

When the database is running, use the following comand to launch the app in local enviroment:

``` javascript
	npm run local
```

and the app should be running in ```localhost:9000```

#### Running in mongodb atlas:
As it was mentioned, make sure to fill all the parameter required from the .env to launch successfully the app with the following command:

``` javascript
	npm run dev 
```

and the app should be running in ```localhost:9000```

---

If you are using an IDE for MongoDB as **NoSQLBooster**, you can use this example to connect to your local and cloud database in a easier way:

local enviroment
``` 
mongodb://<username>:<password>@localhost:27017/test
```

mongodb atlas

```
mongodb+srv://<username>:<password>@<server>/test
```