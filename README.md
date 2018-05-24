[![Build Status](https://travis-ci.org/tonymontaro/document-management-system.svg?branch=develop)](https://travis-ci.org/tonymontaro/document-management-system)
[![Coverage Status](https://coveralls.io/repos/github/andela-angene/document-management-system/badge.svg?branch=develop)](https://coveralls.io/github/andela-angene/document-management-system?branch=develop)
[![Code Climate](https://codeclimate.com/github/andela-angene/document-management-system/badges/gpa.svg)](https://codeclimate.com/github/andela-angene/document-management-system)

# DOC-MAGE - Fullstack Document Management System

DOC-MAGE is an application that helps users manage their documents in an organized way. A User can create a document, edit and share it with others.
The application utilizes RESTFUL API architecture for managing documents, users and roles.

[Click here](http://doc-mage.herokuapp.com/) to view the app on Heroku.

## Features

The app has three levels of authorization;
- Guest can
    - view public documents on the website
    - create an account

- A regular user can:
    - create documents
    - edit and Delete his/her document
    - edit and Delete his/her profile
    - limit access to a document by specifying an access level to public, private or role.
    - view public documents created by other users.
    - view `role` documents created users with the same or lesser role level.
    - login/logout.

- An admin user has all the previlages of a regular user and do the following too:
    - view all users.
    - update a user's role e.g upgrade another user to admin.
    - create roles.
    - edit and delete existing roles
    - Delete created roles aside form the admin role

## Technologies
The application was developed with [NodeJs](http://nodejs.org/), [Express](http://expressjs.com/) was used for routing and [Postgres](http://postgresql.com/) with sequelize was used for database management.
 ReactJS with the Redux architecture was used to build the client side of the application

## Installation
Follow the steps below to setup a local development environment. First ensure you have [Postgresql](https://www.postgresql.org/) installed, and a version of [Node.js](http://nodejs.org/) equal or greater than v6.10.0.

1. Clone the repository from a terminal `git clone https://github.com/andela-angene/document-management-system.git`.
2. Navigate to the project directory `cd document-management-system`
3. Rename `.env_sample` to `.env` and add the required DATABASE URL.
4. Install project dependencies `npm install`
5. Start the express server `npm start`.

## Testing
Ensure that project dependencies are installed before running tests.
### Server and Client tests
1. Open a terminal and navigate to the project directory
2. Add a test database url (DATABASE_TEST_URL) to the `.env` file.
3. Run `npm test`
### End to end tests
1. Ensure the app is running, you can start it with `npm start`
2. Open another terminal, navigate to the project directory and setup the test with `npm run e2e-setup`
2. Run `npm run e2e-test`

## API Summary
View full API documentation [here](http://doc-mage.herokuapp.com/api)

### Users
EndPoint                      |   Functionality
------------------------------|------------------------
POST /users/login         |   Logs in a user.
POST /users/logout        |   Logs out a user.
POST /users/              |   Creates a new user.
GET /users/               |   Gets all users (available only to the Admin).
GET /users/:id           |   Find a user by id.
PUT /users/:id           |   Updates a user's profile based on the id specified (available to the profile owner or admin)
DELETE /users/:id        |   Delete a user's profile (available only to the profile owner)
GET /users/:id/documents   | Gets all documents for a particular user
GET search/users/?q=${query} | Get all users with username containing the search query

### Documents
EndPoint                      |   Functionality
------------------------------|------------------------
POST /documents/          |   Creates a new document instance.
GET /documents/           |   Gets all documents.
GET /documents/:id       |   Find document by id.
PUT /documents/:id       |   Updates a document's attributes. (available only to the author)
DELETE /documents/:id    |   Delete a document. (available only to the author)
GET search/documents/?q=${query} | Get all documents with title containing the search query

### Roles (available only to the Admin)
EndPoint                      |   Functionality
------------------------------|------------------------
GET /roles/               |   Get all Roles.
POST /roles/               |   Create a Role.
PUT /roles/:id               |   Edit a Role.
DELETE /roles/:id               |   Delete a Role.

### Limitations

The app currently cannot handle more than 3,000,000,000 users or documents but can be scalled up if the need arises.

### Contributing

Contributions are most welcome. Simply fork the repository, work on the feature and raise a PR.

### Licence
MIT
