import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Artist from './Artist.js';

export default class ArtistsList extends Component {
  constructor(props) {
    super(props);
    this.renderArtists = this.renderArtists.bind(this);
  }
  renderArtists() {
    return this.props.albums.map(album => (
      <Artist key={album._id}artist={album.artistInfo} />
    ));
  }
  render() {
    return (
      <div className="artist-list-container">
        <ul>
          {this.renderArtists()}
        </ul>
      </div>
    );
  }
}

ArtistsList.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
