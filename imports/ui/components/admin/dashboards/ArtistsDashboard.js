import React from 'react';
import PropTypes from 'prop-types';

import ArtistsList from '../artists/ArtistsList.js';

const ArtistsDashboard = props => (
  <ArtistsList
    artists={props.artists}
    albums={props.albums}
  />
);

ArtistsDashboard.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ArtistsDashboard;
