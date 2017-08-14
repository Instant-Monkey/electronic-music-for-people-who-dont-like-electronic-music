import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import Albums from '../../../api/albums.js';

import ResultSearchAlbum from './ResultSearchAlbum.js';

const ResultSearchAlbumsContainerStyle = {
  marginTop: '10px',
};

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.handleAlbumSubmit = this.handleAlbumSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleRelationshipSubmit = this.handleRelationshipSubmit.bind(this);
    this.toogleDefaultCheckAlbum = this.toogleDefaultCheckAlbum.bind(this);
    this.searchForAlbums = this.searchForAlbums.bind(this);
    this.renderResultSearchAlbums = this.renderResultSearchAlbums.bind(this);
    this.handleSpotifyAlbumSumbit = this.handleSpotifyAlbumSumbit.bind(this);
    this.renderClearSearchButton = this.renderClearSearchButton.bind(this);
    this.clearSearchResults = this.clearSearchResults.bind(this);
    this.state = {
      album1Value: '',
      album2Value: '',
      defaultCheckAlbum: false,
      searchAlbumResults: [],
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

  createAlbumUrl(albumName, artistName) {
    const albumUrl =
    albumName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '').toLowerCase() +
    artistName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '').toLowerCase();
    return albumUrl;
  }
  handleSpotifyAlbumSumbit(album) {
    const albumName = album.name;
    const artistName = album.artists[0].name;
    const albumSpotifyId = album.id;
    const albumUrl = this.createAlbumUrl(albumName, artistName);
    const albumToInsert = {
      albumName,
      artistName,
      albumUrl,
      albumSpotifyId,
      SpotifyAlbumObject: album,
      defaultAlbum: this.state.defaultCheckAlbum,
    };

    Meteor.call('albums.insert', albumToInsert);
  }
  handleAlbumSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const albumName = this.albumInput.value.trim();
    const artistName = this.artistInput.value.trim();
    const albumUrl = this.createAlbumUrl(albumName, artistName);

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
  searchForAlbums() {
    const albumSearched = this.albumSearchInput.value.trim();
    Meteor.call('searchForAlbums', albumSearched, (error, result) => {
      if (result.length === 0) {
        console.log('pas de résultats');
      } else {
        this.setState({
          searchAlbumResults: result,
        });
      }
    });
  }
  renderAlbumsOption() {
    return this.props.albums.map(album => (
      <option key={album._id} value={album._id}>{album.albumName}</option>
    ));
  }
  renderResultSearchAlbums() {
    return this.state.searchAlbumResults.map(album => (
      <ResultSearchAlbum key={album.id} album={album} onClick={this.handleSpotifyAlbumSumbit} />
    ));
  }
  clearSearchResults() {
    return this.setState({
      searchAlbumResults: [],
    });
  }
  renderClearSearchButton() {
    if (this.state.searchAlbumResults.length > 0) {
      return <button onClick={this.clearSearchResults}>Clear Search Results</button>;
    }
    return null;
  }

  render() {
    return (
      <div className="admin-temp-container" ref={(node) => { this.node = node; }}>
        <h1> Admin Dashboard </h1>
        <input
          type="text"
          ref={(node) => { this.albumSearchInput = node; }}
          placeholder="Search for an album "
        />
        <button onClick={this.searchForAlbums}>Rechercher</button>
        {this.renderClearSearchButton()}
        <div className="search-result-container row" style={ResultSearchAlbumsContainerStyle}>
          {this.renderResultSearchAlbums()}
        </div>
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
