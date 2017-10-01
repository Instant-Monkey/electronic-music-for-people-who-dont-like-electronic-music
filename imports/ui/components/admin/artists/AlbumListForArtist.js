import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


import AlbumInArtist from './AlbumInArtist.js';

export default class AlbumListForArtist extends Component {
  constructor(props) {
    super(props);
    this.renderAlbumsInArtist = this.renderAlbumsInArtist.bind(this);
  }
  renderAlbumsInArtist() {
    return this.props.albums.map(album => (
      <AlbumInArtist key={album._id} album={album} />
    ));
  }
  render() {
    return (
      <List>
        <Subheader>{'Albums de l\'artiste'}</Subheader>
        {this.renderAlbumsInArtist()}
      </List>
    );
  }
}

AlbumListForArtist.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
