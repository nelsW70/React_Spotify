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
  const accessToken = 'BQBggwN9VPkYHdUJDJ1jzliPw6o9fciHiNFzczvS3fsmUUYEQxMGBfcsntgYfcbTrewG_dhyxab74fQykfNNlhLSfOWXfpsL3hYAm9rECsoepqsSr6hxVj6_P09Xvwl-mzzcglF_mw_5FezusqXnS8qAiXPE&refresh_token=AQBz6UT3jiB6T1ZW49IW9eDazdXleqpHCLBccQQRH6VWkpw_2_C-DgdW_VovAHqXmp1dDyVKyta78epwWKG3-ldxrw0TyC_wj1tfQParDzvB8h1CLI_KeTrWbPb-LsDqm74'
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
                onChange={event => {this.setState({ query: event.target.value})}}
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
        <Profile
          artist={this.state.artist}
        />
        <div className="Gallery">
          Gallery
        </div>
      </div>
    );
  }
}

export default App;

// access token
// BQDaJjMumISAz0KV4Tx2mpEIEdCJIGEsrY8urtsO3FJIKYPKp7Jme3xwfRdLpvLlI4aS1dK_jCyLGWBYEYIRRyJcrhsI5-nPoV4UXu6MF7IrauoweI6sNbABfX6xw_LHnkaVicuW-t0ub5LliWaqWYiSkvED&refresh_token=AQAfhJioBjdXfCdWzcCFZty4_rOQe3ANOHJMYzJ9e0w3mhcNRyXzKeD0qAVNsGmubDmxPVb-DHf1vwcIURxO-X5F-YxnpipdIJvv6nJzwNcobAkEYjJYXxpXoedEkWeh0ho
