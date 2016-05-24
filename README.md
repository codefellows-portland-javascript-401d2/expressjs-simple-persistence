## HTTP server with routing and persistence

##### To install, clone this repo then run

    npm install
    node index.js

##### Available endpoints and methods:
- GET
  - "/" - Gets a list of available festivals
  - "/<resource>" - Returns all data for the specified festival.
- POST
  - "/" - Adds a new festival to the database, send body as a JSON using the schema below.
- PUT
  - "/<resource>" - It replaces properties of the specified festival with the object provided. Include a a JSON object in the body, be sure to include the resource property in the JSON.
- DELETE
  - "/<resource>" - Deletes the specified festival.

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
