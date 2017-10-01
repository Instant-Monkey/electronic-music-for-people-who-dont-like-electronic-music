import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Artist from './Artist.js';

export default class ArtistsList extends Component {
  constructor(props) {
    super(props);
    this.renderArtists = this.renderArtists.bind(this);
  }
  renderArtists() {
    return this.props.albums.map((album) => {
      if (!album.defaultAlbum) {
        return <Artist key={album._id} artist={album.artistInfo} />;
      }
      return false;
    });
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
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
