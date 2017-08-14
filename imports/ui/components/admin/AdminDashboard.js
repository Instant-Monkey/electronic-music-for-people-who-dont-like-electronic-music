import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import Albums from '../../../api/albums.js';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.handleAlbumSubmit = this.handleAlbumSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleRelationshipSubmit = this.handleRelationshipSubmit.bind(this);
    this.toogleDefaultCheckAlbum = this.toogleDefaultCheckAlbum.bind(this);
    this.state = {
      album1Value: '',
      album2Value: '',
      defaultCheckAlbum: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ album1Value: nextProps.albums[0]._id });
    this.setState({ album2Value: nextProps.albums[0]._id });
  }
  toogleDefaultCheckAlbum() {
    this.setState({
      defaultCheckAlbum: !this.state.defaultCheckAlbum,
    });
  }
  handleAlbumSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const albumName = this.albumInput.value.trim();
    const artistName = this.artistInput.value.trim();
    const albumUrl =
    albumName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '').toLowerCase() +
    artistName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '').toLowerCase();

    const album = {
      albumName,
      artistName,
      albumUrl,
      defaultAlbum: this.state.defaultCheckAlbum,
    };
    Meteor.call('albums.insert', album);

    // Clear form
    this.albumInput.value = '';
    this.artistInput.value = '';
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
  }
  handleSelectChange(event) {
    if (event.target.className === 'album-1-select') {
      this.setState({ album1Value: event.target.value });
    } else if (event.target.className === 'album-2-select') {
      this.setState({ album2Value: event.target.value });
    }
  }
  showObject() {
    Meteor.call('getAlbumWithId', '1ZwWGJGj9TtQPStBDcRY9c', (error, result) => {
      console.log(result);
    });
  }
  renderAlbumsOption() {
    return this.props.albums.map(album => (
      <option key={album._id} value={album._id}>{album.albumName}</option>
    ));
  }

  render() {
    return (
      <div className="admin-temp-container" ref={(node) => { this.node = node; }}>
        <h1> Admin Dashboard </h1>
        <button onClick={this.showObject}>show spotify object</button>
        <form className="new-album">
          <input
            type="text"
            ref={(node) => { this.albumInput = node; }}
            placeholder="Type to add album"
          />
          <input
            type="text"
            ref={(node) => { this.artistInput = node; }}
            placeholder="Type to add artist"
          />
          <input
            type="checkbox"
            readOnly
            checked={this.state.defaultCheckAlbum}
            onClick={this.toogleDefaultCheckAlbum}
            ref={(node) => { this.defaultCheckAlbum = node; }}
          />
          <button onClick={this.handleAlbumSubmit}>Envoyer lalbum </button>
        </form>
        <br />
        <form >
          <select value={this.state.album1Value} className="album-1-select" onChange={this.handleSelectChange}>
            {this.renderAlbumsOption()}
          </select>
          <select value={this.state.album2Value} className="album-2-select" onChange={this.handleSelectChange}>
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

AdminDashboard.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('albums');
  return {
    albums: Albums.find({}).fetch(),
  };
}, AdminDashboard);