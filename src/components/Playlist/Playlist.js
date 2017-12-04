import React, {Component} from 'react';
import Tracklist from '../Tracklist/Tracklist'
import './Playlist.css';


class Playlist extends Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	handleNameChange(e) {
		console.log(e.target.value);
		this.props.onNameChange(e.target.value)
	}

	onSave() {
		this.props.savePlaylist();
	}

	render() {
		return (
	    <div className="Playlist">
	      <input value={this.props.playlistName} onChange={this.handleNameChange} />
	      <Tracklist tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} />
	      <a className="Playlist-save" onClick={this.onSave}>SAVE TO SPOTIFY</a>
	    </div>
		)
	}
}

export default Playlist;