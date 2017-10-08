import React from 'react';
import PropTypes from 'prop-types';

import Divider from 'material-ui/Divider';

import AlbumSearchContainer from '../albums/AlbumSearchContainer.js';
import DashboardTitle from '../smallComponents/DashboardTitle.js';

const AlbumsDashboard = props => (
  <div className="album-dashboard-container">
    <DashboardTitle primaryText="add album from spotify" />
    <Divider />
    <AlbumSearchContainer createAlbumUrl={props.createAlbumUrl} />
  </div>
);

AlbumsDashboard.propTypes = {
  createAlbumUrl: PropTypes.func.isRequired,
};

export default AlbumsDashboard;
