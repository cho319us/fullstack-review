import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    Top {props.repos.length} repos with highest fork number
    <div>
      {props.repos.map((repo, index) =>
        <RepoListEntry key={index} repo={repo}/>
      )}
    </div>
  </div>
)

export default RepoList;