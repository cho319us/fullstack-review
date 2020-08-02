// Dependency
const express = require('express');
let app = express();
let github = require('../helpers/github.js');
let db = require('../database/index.js');

// Middleware
app.use(express.static(__dirname + '/../client/dist')); // set up static files handler
app.use(express.json()); // recognize the Request Object as a JSON Object
app.use(express.urlencoded({extended: true})); // recognize the Request Object as strings or arrays.

// Route
app.post('/repos', function (req, res) {
  // get the github username from the req
  let username = req.body.username;
  // get the repos information from the github API by axios get request
  github.getReposByUsername(username)
    .then(response => {
      console.log("GET request to GitHub API succeed: ", response);
      // save the repos information in the database
      db.save(response.data);
      // send the reponse to client
      res.status(201).send();
    })
    .catch(error => {
      console.log("GET request to GitHub API failed: ", error);
      // send the reponse to client
      res.status(400).send(error);
    });
});

app.get('/repos', function (req, res) {
  // get the top 25 repos from the database ordered by the number of fork in descending
  db.getTopRepos()
    .then(response => {
      // send the reponse to client
      res.status(201).send(response);
    })
    .catch(error => {
      // send the reponse to client
      res.status(400).send(error);
    });
});

// Start server
let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

