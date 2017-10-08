import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Artist from './Artist.js';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class ArtistsList extends Component {
  constructor(props) {
    super(props);
    this.renderArtists = this.renderArtists.bind(this);
    this.getAlbumsForArtist = this.getAlbumsForArtist.bind(this);
  }
  getAlbumsForArtist(artistAlbums) {
    return this.props.albums.filter(album =>
      // check all the id of the albums associetd with artist and return true if one is here
      artistAlbums.some(
        artistAlbum => artistAlbum === album.albumId,
      ));
  }
  renderArtists() {
    return this.props.artists.map(artist => (
      <Artist
        key={artist._id}
        artist={artist}
        albums={this.getAlbumsForArtist(artist.albums)}
      />
    ));
  }
  render() {
    return (
      <div className="artist-list-container row" style={styles.root}>
        {this.renderArtists()}
      </div>
    );
  }
}

ArtistsList.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
