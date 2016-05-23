## HTTP server with persistence

##### To install, clone this repo then run

    npm install
    node index.js

##### Available endpoints and methods:
- GET
  - / - gets a list of available festivals
  - /resource - returns all data for each item listed.
- POST
  - / - adds a new festival to the database
- PUT
  - /resource - replaces properties of the specified resource with information provided
- DELETE
  - /resource - deletes the specified resource

##### Data is sent and received in JSON format, as follows:

    {
      "title" : "Rock Skipping Festival",
      "year" : 2016,
      "location" : "Shelbyville",
      "interests" : "rocks, skipping"
    }

##### POSTing a new entry will return the object with an added resource ID field:

    {
      "resource" : "rock_skipping_festival"
    }

##### Tests are available:

    npm test
