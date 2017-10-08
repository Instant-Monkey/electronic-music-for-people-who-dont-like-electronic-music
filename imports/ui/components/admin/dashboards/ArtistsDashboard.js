import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ArtistsList from '../artists/ArtistsList.js';

export default class ArtistsDashboard extends Component {
  constructor() {
    super(props)
    this.filterArtists = this.filterArtists.bind(this)
  }
}
  <ArtistsList
    artists={props.artists}
    albums={props.albums}
  />
);

ArtistsDashboard.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
