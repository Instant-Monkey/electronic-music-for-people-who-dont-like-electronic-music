import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

import ResultSearchAlbum from './ResultSearchAlbum.js';

const ResultSearchAlbumsContainerStyle = {
  marginTop: '10px',
};

class AlbumSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSpotifyAlbumSumbit = this.handleSpotifyAlbumSumbit.bind(this);
    this.clearSearchResults = this.clearSearchResults.bind(this);
    this.updateAlbumFieldValue = this.updateAlbumFieldValue.bind(this);
    this.renderClearSearchButton = this.renderClearSearchButton.bind(this);
    this.renderResultSearchAlbums = this.renderResultSearchAlbums.bind(this);
    this.searchForAlbums = this.searchForAlbums.bind(this);
    this.state = {
      searchAlbumResults: [],
      albumFieldValue: '',
    };
  }
  handleSpotifyAlbumSumbit(album) {
    const albumName = album.name;
    const artistName = album.artists[0].name;
    const albumUrl = this.props.createAlbumUrl(albumName, artistName);
    this.clearSearchResults();
    Meteor.call('getArtistWithId', album.artists[0].id, function(err, res) {
      if (err) {
        console.log(err);
        return null;
      }
      const albumToInsert = {
        albumInfo: {
          albumName,
          albumUrl,
          SpotifyAlbumObject: album,
        },
        albumId: album.id,
        artistId: res.id,
      };
      const artistToInsert = {
        artistInfo: {
          artistName,
          SpotifyArtistObject: res,
        },
        album: album.id,
        artistId: res.id,
      };
      Meteor.call('albums.insertArtist', artistToInsert);
      Meteor.call('albums.insertAlbum', albumToInsert);
      return true;
    });
  }
  clearSearchResults() {
    return this.setState({
      searchAlbumResults: [],
    });
  }
  searchForAlbums(e) {
    e.preventDefault();
    const albumSearched = this.state.albumFieldValue;
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
  updateAlbumFieldValue(e, value) {
    this.setState({
      albumFieldValue: value,
    });
  }
  renderClearSearchButton() {
    if (this.state.searchAlbumResults.length > 0) {
      return <button onClick={this.clearSearchResults}>Clear Search Results</button>;
    }
    return null;
  }
  renderResultSearchAlbums() {
    return this.state.searchAlbumResults.map(album => (
      <ResultSearchAlbum key={album.id} album={album} onClick={this.handleSpotifyAlbumSumbit} />
    ));
  }
  render() {
    return (
      <div className="album-search-contaier">
        <form onSubmit={this.searchForAlbums}>
          <TextField
            value={this.state.albumFieldValue}
            hintText="Search for an album "
            onChange={this.updateAlbumFieldValue}
          />
        </form>
        {this.renderClearSearchButton()}
        <div className="search-result-container row" style={ResultSearchAlbumsContainerStyle}>
          {this.renderResultSearchAlbums()}
        </div>
      </div>
    );
  }
}

AlbumSearchContainer.propTypes = {
  createAlbumUrl: PropTypes.func.isRequired,
};

export default AlbumSearchContainer;
