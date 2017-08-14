import React, { Component } from 'react';

import Album from './Album.js';
import Decision from './Decision.js';

import Albums from '../../api/albums.js';

export default class Main extends Component {
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
      <div className="main-conter">
        <h1> My awesome music guide </h1>
        <Album album={this.state.currentAlbum} />
        {this.renderDecisions()}
      </div>
    );
  }
}
