import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class AlbumListForArtist extends Component {
  constructor(props) {
    super(props);
    this.renderAlbumsInArtist = this.renderAlbumsInArtist.bind(this);
  }
  renderAlbumsInArtist() {

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
