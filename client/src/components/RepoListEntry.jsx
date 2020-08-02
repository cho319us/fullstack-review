import React from 'react';

const RepoListEntry = (props) => (
  <div>
    <ul>
      <li>Username: {props.repo.username}</li>
      <li>Repo Name: {props.repo.reponame}</li>
      <li>Repo Url: {props.repo.repourl}</li>
      <li>Fork Count: {props.repo.forkcount}</li>
    </ul>
  </div>
)

export default RepoListEntry;