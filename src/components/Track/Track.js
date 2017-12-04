import React, {Component} from 'react';
import './Track.css';


class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    let icon = "+";

    if(this.props.isRemoval) {
      icon = "-";
    }

    return icon;
  }

  addTrack() {
    this.props.onAdd(this.props.track)
  }

  removeTrack() {
    this.props.onRemove(this.props.track)
  }

	render() {
		return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.title}</h3>
          <p>{this.props.track.author} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" onClick={this.renderAction() === '+' ? this.addTrack : this.removeTrack }>{this.renderAction()}</a>
      </div>
		)
	}
}

export default Track;