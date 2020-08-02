const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // Use the axios module to request repos for a specific user from the GitHub API
  // The options object has been provided to help you out, but you'll have to fill in the URL
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`, // repos_url of the user
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return axios(options);
}

module.exports.getReposByUsername = getReposByUsername;