import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import Albums from '../../../../api/albums.js';

import Artist from './Artist.js';

class ArtistsList extends Component {
  constructor(props) {
    super(props);
    this.renderArtists = this.renderArtists.bind(this);
  }
  renderArtists() {
    return this.props.albums.map(album => (
      <Artist key={album._id}artist={album.artistInfo} />
    ));
  }
  render() {
    return (
      <div className="artist-list-container">
        <ul>
          {this.renderArtists()}
        </ul>
      </div>
    );
  }
}

ArtistsList.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('albums');
  return {
    albums: Albums.find({}).fetch(),
  };
}, ArtistsList);
