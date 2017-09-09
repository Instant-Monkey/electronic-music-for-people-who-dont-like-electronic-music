import React, { Component } from 'react';

import Artist from './Artist.js';

class ArtistsList extends Component {
  renderArtists() {
    return Artists;
  }
  render() {
    return (
      <div className="artist-list-container">
          <Artist />
      </div>
    );
  }
}

export default ArtistsList;
