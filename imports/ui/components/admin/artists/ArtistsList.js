import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Artist from './Artist.js';

export default class ArtistsList extends Component {
  constructor(props) {
    super(props);
    this.renderArtists = this.renderArtists.bind(this);
  }
  renderArtists() {
    return this.props.artists.map(artist => (
      <Artist key={artist._id} artist={artist} albums={artist.albums} />
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
};
