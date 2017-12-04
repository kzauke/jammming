import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: 123456,
          uri: 'spotify:track:3nfjj8JKLU890',
          title: 'How Will I Know',
          author: 'Whitney Houston',
          album: 'Whitney'
        },
        {
          id: 234567,
          uri: 'spotify:track:3nfjj78dhKLU890',
          title: 'I Wanna Dance with Somebody',
          author: 'Whitney Houston',
          album: 'Whitney'
        },
        {
          id: 345678,
          uri: 'spotify:track:3nfjjJKL8890',
          title: 'I Have Nothing',
          author: 'Whitney Houston',
          album: 'The Bodyguard - Original Soundtrack Album'
        }
      ],
      
      playlistName: 'New Playlist',

      playlistTracks: [
        {
          id: 598765,
          uri: 'spotify:track:3nfjj8IKDM455U890',
          title: 'Tiny Dancer',
          author: 'Elton John',
          album: 'Madman Across The Water'
        },
        {
          id: 987654,
          uri: 'spotify:track:3nfjj8JKLsk990',
          title: 'Stronger',
          author: 'Britney Spears',
          album: 'Oops!... I Did It Again'
        },
        {
          id: 876543,
          uri: 'spotify:track:kkI83j8JKLU890',
          title: 'Black Lodge',
          author: 'Anthrax',
          album: 'The Sound of White Noise'
        }
      ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.find(x => x.id === track.id)) {
      this.state.playlistTracks.push(track);
      this.setState({})
    }
  }

  removeTrack(track) {
    let songIndex = this.state.playlistTracks.indexOf(track)
    this.state.playlistTracks.splice(songIndex,1);
    this.setState({});
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let trackURIs = Array.from(this.state.playlistTracks, x => x.uri);
    console.log(trackURIs);
  }

  search(searchTerm) {
    Spotify.getAccessToken();
    console.log(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistTracks={this.state.playlistTracks} 
              playlistName={this.state.playlistName} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} savePlaylist={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
