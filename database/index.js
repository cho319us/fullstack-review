const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher'); // create and connect to the fetcher database

let repoSchema = mongoose.Schema({
  username: String,
  userid: Number,
  reponame: String,
  repoid: {type: Number, unique: true}, // not accept duplicate repos
  repourl: String,
  forkcount: Number
});

// create a Repo collection/model
let Repo = mongoose.model('Repo', repoSchema);

// This function should save a repo or repos from the GitHub API to the MongoDB
// If import the same repo twice, it should only show up once in database
let save = (reposArr) => {
  // iterate over the reposArr
  for (var i = 0; i < reposArr.length; i++) {
    // transfer the current repo object to a repo document instance
    let currRepoDoc = new Repo({
      username: reposArr[i].owner.login,
      userid: reposArr[i].owner.id,
      reponame: reposArr[i].name,
      repoid: reposArr[i].id, // not accept duplicate repos
      repourl: reposArr[i].html_url,
      forkcount: reposArr[i].forks_count
    });
    // saved the current repo document to the database
    currRepoDoc.save((err, currRepoDoc) => {
      // case for error
      if (err) {
        console.log("Failed to save the repo document to database: ", err);
      // case for succeed
      } else {
        console.log("Succeed to save the repo document to database: ", currRepoDoc);
      }
    });
  }
}

module.exports.save = save;