import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  search() {
  console.log('this.state', this.state);
  const BASE_URL = 'https://api.spotify.com/v1/search?';
  const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
  console.log('FETCH_URL', FETCH_URL);
  const accessToken = 'BQDETcd4ncefOrPyvWHO1YrnSFPu2uNQDGmiFA6VB-aC36IaiTQKjvxKh6-BHHQcahW7qrikOZ9T2Laf-PZCVNCT3jJ9XtX2WoMsjCKjx5VaVCbT1fla3dQ4S31taOi_RFSkvGmeAY2ueao15de0Soa3PBSl&refresh_token=AQBg78Gaz3HN_866_Xh4i-IcUPEBCg98rDBFCKILYeBs-PMmyt2u_3Tq-66gpaIW9t0x8H9BAafLkJB3ispYvMT3hC1WsLQ4GQ7PIV_c2XIoB7LBfL0OJmPmA-ORTeLjk5M'
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
    .then(json => console.log(json))
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
        <div className="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
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
