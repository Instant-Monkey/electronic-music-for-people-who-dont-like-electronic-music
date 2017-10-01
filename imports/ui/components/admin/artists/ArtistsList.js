import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Artist from './Artist.js';

export default class ArtistsList extends Component {
  constructor(props) {
    super(props);
    this.renderArtists = this.renderArtists.bind(this);
    this.getAlbumsForArtist = this.getAlbumsForArtist.bind(this);
  }
  getAlbumsForArtist(artistAlbums) {
    const albumsForArtist = [];
    this.props.albums.map((album) => {
      for (let i = 0; i < artistAlbums.length; i += 1) {
        if (artistAlbums[i] === album.albumId) {
          albumsForArtist.push(album);
        }
      }
      return album;
    });
    return albumsForArtist;
  }
  renderArtists() {
    return this.props.artists.map(artist => (
      <Artist key={artist._id} artist={artist} albums={this.getAlbumsForArtist(artist.albums)} />
    ));
  }
  render() {
    return (
      <div className="artist-list-container row">
        {this.renderArtists()}
      </div>
    );
  }
}

ArtistsList.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
