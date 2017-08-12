import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import AdminDashboard from './components/AdminDashboard.js';
import Album from './components/Album.js';
import Decision from './components/Decision.js';

import Albums from '../api/albums.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDecision = this.handleDecision.bind(this);
    this.state = {
      currentAlbum: {},
    };
  }
  componentWillReceiveProps() {
    const defaultAlbum = Albums.findOne({ defaultAlbum: true });
    this.setState({
      currentAlbum: defaultAlbum,
    });
  }
  updateCurrentAlbum(albumId) {
    const newCurrentAlbum = Albums.findOne({ _id: albumId });
    this.setState({
      currentAlbum: newCurrentAlbum,
    });
  }
  handleDecision(decision) {
    this.updateCurrentAlbum(decision.albumId);
  }
  renderDecisions() {
    if (this.state.currentAlbum.targetNodes) {
      return this.state.currentAlbum.targetNodes.map(nodes => (
        <Decision relationship={nodes} key={nodes.albumId} onClick={this.handleDecision} />
      ));
    }
    return false;
  }
  render() {
    return (
      <div className="app-container">
        <h1> Admin Dashboard </h1>
        <AdminDashboard albums={this.props.albums} />
        <h1> My awesome music guide </h1>
        <Album album={this.state.currentAlbum} />
        {this.renderDecisions()}
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
