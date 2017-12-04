import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {

	constructor(props) {
		super(props);

		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);

		this.state = {
			terms: ""
		}

	}

	search() {
		this.props.onSearch(this.state.terms);
	}

	handleTermChange(e) {
		this.setState({
			terms: e.target.value
		})
	}

	render() {
		return (
	    <div className="SearchBar">
	      <input placeholder="Enter a song, album or artist" onChange={this.handleTermChange} />
	      <a onClick={this.search}>SEARCH</a>
	    </div>			
		)
	}
}

export default SearchBar;
