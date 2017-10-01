import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Albums from '../../../../api/albums.js';

import AlbumInArtist from './AlbumInArtist.js';

class AlbumListForArtist extends Component {
  constructor(props) {
    super(props);
    this.renderAlbumsInArtist = this.renderAlbumsInArtist.bind(this);
  }
  renderAlbumsInArtist() {
    this.props.albums.map(album => {
      console.log(album);
      return <AlbumInArtist album={album} />
    });
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

export default createContainer((props) => {
  Meteor.subscribe('albums');
  const artistsAlbums = [];
  props.albums.map((album) => {
    const AlbumToPush = Albums.findOne({
      albumId: album,
    });
    console.log(AlbumToPush);
    return artistsAlbums.push(AlbumToPush);
  });
  console.log(artistsAlbums);
  return {
    albums: artistsAlbums,
  };
}, AlbumListForArtist);
