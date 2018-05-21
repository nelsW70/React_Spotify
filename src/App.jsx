import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    }
  }

  search() {
  console.log('this.state', this.state);
  const BASE_URL = 'https://api.spotify.com/v1/search?';
  const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
  console.log('FETCH_URL', FETCH_URL);
  const accessToken = 'BQAK9nCkU4hJscMfKllH3OZuGR0BxcE-vCWZYfMPlxao8OQWC-EDuueUhj_Olh8kuvDkpvx05iNEMIWWsfDWNnMo3vX8JERO4E2wkIwb5ZG5nQ9iS2CgUsdKjixnNla3YTeSrj4QSJbXlDBFUDFms_Ov33Sx&refresh_token=AQDkypHrZcBJPvQZZ3eH_aGRD0a3i34xYs9yTPskTpfTNEo4XCxB29SQliki9XWWuKsIoFV_0SmgF83M5I6QPdcHqK9QL22I_YhefWffvVnGGtk5pNq8geOIo5_0uW4c40k'
  // const myHeaders = new Headers();
  const myOptions = {
    method: 'GET',
    headers:  {
      'Authorization': 'Bearer ' + accessToken
   },
    mode: 'cors',
    cache: 'default'
  };

  fetch(FETCH_URL, myOptions )
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      console.log('artist', artist);
      this.setState({artist});
    })
}

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search for an Artist"
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.search()
                  }
                }}
              />
              <InputGroup.Addon onClick={() => this.search()}>
                <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          {
            this.state.artist !== null
            ?
              <div>
                <Profile
                  artist={this.state.artist}
                  />
                  <div className="Gallery">
                    Gallery
                  </div>
              </div>

            : <div></div>
          }
      </div>
    );
  }
}

export default App;
