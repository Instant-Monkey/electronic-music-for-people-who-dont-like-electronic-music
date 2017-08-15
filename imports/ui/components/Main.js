import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import Album from './Album.js';
import Decision from './Decision.js';

import Albums from '../../api/albums.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleDecision = this.handleDecision.bind(this);
    this.state = {
      currentAlbum: {
        defaultAlbum: true,
      },
      choiceHistory: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    const defaultAlbum = nextProps.defaultAlbum;
    const joinedChoiceHistory = this.state.choiceHistory.concat(defaultAlbum);
    this.setState({
      currentAlbum: defaultAlbum,
      choiceHistory: joinedChoiceHistory,
    });
  }
  updateCurrentAlbum(albumId) {
    const newCurrentAlbum = Albums.findOne({ _id: albumId });
    const joinedChoiceHistory = this.state.choiceHistory.concat(newCurrentAlbum);
    this.setState({
      currentAlbum: newCurrentAlbum,
      choiceHistory: joinedChoiceHistory,
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
      <div className="main-container">
        <h1> My awesome music guide </h1>
        <Album album={this.state.currentAlbum} />
        {this.renderDecisions()}
      </div>
    );
  }
}

Main.propTypes = {
  defaultAlbum: PropTypes.object,
};

Main.defaultProps = {
  defaultAlbum: {},
};

export default createContainer(() => {
  Meteor.subscribe('albums');
  return {
    defaultAlbum: Albums.findOne({ defaultAlbum: true }),
  };
}, Main);
