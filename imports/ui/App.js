import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import AdminDashboard from './components/AdminDashboard.js';
import Album from './components/Album.js';

import Albums from '../api/albums.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlbum: '',
    };
  }
  componentWillReceiveProps() {
    const defaultAlbum = Albums.findOne({ defaultAlbum: true });
    this.setState({
      currentAlbum: defaultAlbum,
    });
  }
  renderAlbums() {
    return this.props.albums.map(album => (
      <Album album={album} key={album._id} />
    ));
  }
  render() {
    return (
      <div className="app-container">
        <h1> Admin Dashboard </h1>
        <AdminDashboard albums={this.props.albums} />
        <h1> The app </h1>
        {this.renderAlbums()}
      </div>
    );
  }
}
App.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => (
  {
    albums: Albums.find({}).fetch(),
  }
), App);
