import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import AlbumSearchContainer from '../albums/AlbumSearchContainer.js';

const AlbumsDashboard = props => (
  <AlbumSearchContainer createAlbumUrl={props.createAlbumUrl} />
);

AlbumsDashboard.propTypes = {
  createAlbumUrl: PropTypes.func.isRequired,
};

export default AlbumsDashboard;
