import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import AdminDashboard from './components/AdminDashboard.js';
import Main from './components/Main.js';

import Albums from '../api/albums.js';

const App = props => (
  <div className="app-container">
    <AdminDashboard albums={props.albums} />
    <Main />
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
