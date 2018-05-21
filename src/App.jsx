import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
  console.log('this.state', this.state);
  const BASE_URL = 'https://api.spotify.com/v1/search?';
  let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
  const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
  const accessToken = 'BQDPVEsQ1TIrO-i77Ogk6xL221K1IUoh0i1ZQ3cwJP-wwc96NakFW4YuUtn-_a9GJQc9-jPQZAz2Y3R_EyHXJ_pL57AgJSJ_vJIrq8L9r8Hjw_XZ_nEEfElndKU6GT5Z42DEjOtoW4TXwjAGJKg-F39H3x-w&refresh_token=AQAUlhCVmtVcE8PW640REqYeiVohmabm63RUgnQH2Cmux4W4TCSRwtGRwXrYKEkz5UKarwM-KaXTM5t7dnA47Z7FNk-0UbxxxNOoVIu-uuvwPMJCdR24xn4MXGSBQfa0cY0'
  // const myHeaders = new Headers();
  const myOptions = {
    method: 'GET',
    headers:  {
      'Authorization': 'Bearer ' + accessToken
   },
    mode: 'cors',
    cache: 'default'
  };

  fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      console.log('artist', artist);
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        console.log('artist\'s top tracks:', json);
        const { tracks } = json;
        this.setState({tracks});
      })
    });
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
                  <Gallery
                    tracks={this.state.tracks}
                  />
              </div>
            : <div></div>
          }
      </div>
    );
  }
}

export default App;
