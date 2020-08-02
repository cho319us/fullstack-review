import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // send POST request to /repos
    $.post('/repos', {username: term}, () => {
      console.log("POST request succeed");
      // update the page with the latest top 25 without requiring a page refresh
      this.getRepos();
    });
  }

  getRepos () {
    // send GET request to /repos
    $.get('/repos', (reposArr) => {
      console.log("Get request succeed", reposArr);
      // update the repos in state
      this.setState({
        repos: reposArr
      });
    });
  }

  // when the page loads, getRepos is invoked (send GET request to /repos)
  // then the top 25 repos are displayed on the page
  componentDidMount() {
    this.getRepos();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));