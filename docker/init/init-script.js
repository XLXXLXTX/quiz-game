// read the .env file

const fs = require('fs');
const path = require('path');

// path to the .env file
const envFilePath = path.resolve(__dirname, '.env');

// read the .env file
const envFileContent = fs.readFileSync(envFilePath, 'utf8');

// parse the .env file
envFileContent.split('\n').forEach((line) => {
  const [key, value] = line.split('=');
  process.env[key] = value;
});

// connect to the database and create the collections

// create all the collections
db.createCollection("categories");
db.createCollection("questions");
db.createCollection("users");
db.createCollection("scores");

// populate the categories collection
db.categories.insertMany([
    {
        "categoryName": "Vehicles",
        "categoryValue": 28
    },
    {
        "categoryName": "Animals",
        "categoryValue": 27
    },
    {
        "categoryName": "Politics",
        "categoryValue": 24
    },
    {
        "categoryName": "Geography",
        "categoryValue": 22
    },
    {
        "categoryName": "Sports",
        "categoryValue": 21
    },
    {
        "categoryName": "Mythology",
        "categoryValue": 20
    },
    {
        "categoryName": "History",
        "categoryValue": 23
    },
    {
        "categoryName": "Science: Mathematics",
        "categoryValue": 19
    },
    {
        "categoryName": "Science: Gadgets",
        "categoryValue": 30
    },
    {
        "categoryName": "Science: Computers",
        "categoryValue": 18
    },
    {
        "categoryName": "Science & Nature",
        "categoryValue": 17
    },
    {
        "categoryName": "Entertainment: Cartoon & Animations",
        "categoryValue": 32
    },
    {
        "categoryName": "Entertainment: Japanese Anime & Manga",
        "categoryValue": 31
    },
    {
        "categoryName": "Entertainment: Board Games",
        "categoryValue": 16
    },
    {
        "categoryName": "Entertainment: Video Games",
        "categoryValue": 15
    },
    {
        "categoryName": "Entertainment: Comics",
        "categoryValue": 29
    },
    {
        "categoryName": "Entertainment: Television",
        "categoryValue": 14
    },
    {
        "categoryName": "Entertainment: Musicals & Theatres",
        "categoryValue": 13
    },
    {
        "categoryName": "Entertainment: Music",
        "categoryValue": 12
    },
    {
        "categoryName": "Entertainment: Film",
        "categoryValue": 11
    },
    {
        "categoryName": "Entertainment: Books",
        "categoryValue": 10
    },
    {
        "categoryName": "Celebrities",
        "categoryValue": 26
    },
    {
        "categoryName": "Art",
        "categoryValue": 25
    },
    {
        "categoryName": "General Knowledge",
        "categoryValue": 9
    },
    {
        "categoryName": "Any category",
        "categoryValue": -1
    }
]);


// create the user to connect to the database from the application
db.createUser({
    user: `${process.env.MONGODB_USER}`,
    pwd: `${process.env.MONGODB_PASSWORD}`,
    roles: [
        { role: "readWrite", db: `${process.env.MONGODB_DB}` }
    ]
});

