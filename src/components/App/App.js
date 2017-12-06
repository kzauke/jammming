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
      searchResults: [],
      
      playlistName: 'New Playlist',

      playlistTracks: []
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
    Spotify.savePlaylist()
    // let trackURIs = Array.from(this.state.playlistTracks, x => x.uri);
    // console.log(trackURIs);
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    });
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
