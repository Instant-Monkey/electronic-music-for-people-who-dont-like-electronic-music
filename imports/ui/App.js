import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import AdminDashboard from './components/AdminDashboard.js';

import { Albums } from '../api/albums.js';

export const App = props => (
  <div className="app-container">
    <h1> Admin Dashboard </h1>
    <AdminDashboard albums={props.albums} />
    <h1> The app </h1>
  </div>
);

App.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => (
  {
    albums: Albums.find({}).fetch(),
  }
), App);
