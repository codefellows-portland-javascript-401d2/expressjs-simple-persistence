![cf](http://i.imgur.com/7v5ASc8.png) expressjs-single-resource-api
====

## API server for books, by Dave and David

##### To install, clone this repo then run

    npm install
    ./index.js [port]

##### Available endpoints and methods:
- GET
  - /books: gets a list of available books
  - /books/resource[/resource]: returns all data for each item listed.
- POST
  - /books: adds a new book to the database
- PUT
  - /books/resource: replaces properties of the specified resource with information provided
- DELETE
  - /books/resource: deleted the specified resource

##### Data is sent and received in JSON format, as follows:

    {
      "title" : "Gone With The Wind",
      "pub_year" : 1964,
      "author" : "Margaret Mitchell",
      "genre" : "fiction",
      "read" : false,
      "resource" : "gone_with_the_wind_1964"
    }

  title and pub_year are required as they are combined to create the resource ID.

##### Tests are available:

    npm test
