import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import AlbumFieldSearch from './AlbumFieldSearch.js';

class RelationshipSubmitter extends Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleRelationshipSubmit = this.handleRelationshipSubmit.bind(this);
    this.state = {
      selectedAlbum1Value: '',
      selectedAlbum2Value: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ selectedAlbum1Value: nextProps.albums[0]._id });
    this.setState({ selectedAlbum2Value: nextProps.albums[0]._id });
  }
  handleRelationshipSubmit(event) {
    event.preventDefault();
    const sourceAlbum = this.node.getElementsByClassName('album-1-select')[0].value;
    const targetAlbum = this.node.getElementsByClassName('album-2-select')[0].value;
    const weightInput = this.relationshipMessageInput.value.trim();

    const relationship = {
      source: {
        albumId: sourceAlbum,
        message: weightInput,
      },
      target: {
        albumId: targetAlbum,
        message: weightInput,
      },
    };

    Meteor.call('albums.updateRelationship', relationship);
    this.relationshipMessageInput.value = '';
  }
  handleSelectChange(event) {
    if (event.target.className === 'album-1-select') {
      this.setState({ selectedAlbum1Value: event.target.value });
    } else if (event.target.className === 'album-2-select') {
      this.setState({ selectedAlbum2Value: event.target.value });
    }
  }
  renderAlbumsOption() {
    return this.props.albums.map(album => (
      <option key={album._id} value={album._id}>{album.albumInfo.albumName}</option>
    ));
  }
  render() {
    return (
      <div className="relationship-submitter-container" ref={(node) => { this.node = node; }}>
        <AlbumFieldSearch albums={this.props.albums} />
        <form >
          <select value={this.state.selectedAlbum1Value} className="album-1-select" onChange={this.handleSelectChange}>
            {this.renderAlbumsOption()}
          </select>
          <select value={this.state.selectedAlbum2Value} className="album-2-select" onChange={this.handleSelectChange}>
            {this.renderAlbumsOption()}
          </select>
          <input
            type="text"
            ref={(node) => { this.relationshipMessageInput = node; }}
            placeholder="what weight?"
          />
          <button onClick={this.handleRelationshipSubmit}>Nouvelle Relation </button>
        </form>
      </div>
    );
  }
}

RelationshipSubmitter.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RelationshipSubmitter;
