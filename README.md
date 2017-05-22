[![Build Status](https://travis-ci.org/andela-angene/document-management-system.svg?branch=develop)](https://travis-ci.org/andela-angene/document-management-system)
[![Coverage Status](https://coveralls.io/repos/github/andela-angene/document-management-system/badge.svg?branch=develop)](https://coveralls.io/github/andela-angene/document-management-system?branch=develop)
[![Code Climate](https://codeclimate.com/github/andela-angene/document-management-system/badges/gpa.svg)](https://codeclimate.com/github/andela-angene/document-management-system)

DOC-MAGE is an application that helps users manage their documents in an organized way. A User can be able to upload a document, edit it and share it with other users. Aside from enabling users to properly document their work.

Fullstack-dms API.
------------------------------
Document Management System provides a restful API for users to create and manage documents. Employing token-based authentication to identify users and Role-based authorisation to grant users different level of access.

Document Management System API is built with JavaScript (ES6), Node.js, Express, Postgresql and Sequelize ORM.

[Click here](http://doc-mage.herokuapp.com/) to view the app on Heroku.

Features
-----------
- Sign up/Login
- create document
- Delete a document
- Edit a document
- View public documents
- Search for documents
- Access control
- The admin can view, search and edit user roles


Installation
------------------
Follow the steps below to setup a local development environment. First ensure you have [Postgresql](https://www.postgresql.org/) installed, and a version of [Node.js](http://nodejs.org/) equal or greater than v6.8.0.

1. Clone this repository from a terminal `git clone https://github.com/andela-angene/document-management-system.git`.
1. Move into the project directory `cd document-management-system`
3. Rename `.env_sample` to `.env` and add the required DATABASE URL, also add the DATABASE_TEST_URL for testing.
1. Install project dependencies `npm install`
1. Start the express server `npm start`.
1. Run the test with `npm test`.

Contributing
------------
If you are planning on contributing to DOC-MAGE, that's awesome. We welcome contributions. Just fork the repo, work on the feature and raise a PR.
