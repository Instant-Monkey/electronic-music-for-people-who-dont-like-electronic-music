import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import Albums from '../../../api/albums.js';

import ManuelAddingAlbum from './ManuelAddingAlbum.js';
import AlbumSearchContainer from './AlbumSearchContainer.js';
import RelationshipSubmitter from './RelationshipSubmitter.js';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.searchForWikipediaSummary = this.searchForWikipediaSummary.bind(this);
  }
  createAlbumUrl(albumName, artistName) {
    const albumUrl =
    albumName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '').toLowerCase() +
    artistName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '').toLowerCase();
    return albumUrl;
  }
  searchForWikipediaSummary() {
    Meteor.call('getWikiSummary', 'DJ_Shadow', (error, result) => {
      console.log(result);
    });
  }
  render() {
    return (
      <div className="admin-temp-container">
        <h1> Admin Dashboard </h1>
        <AlbumSearchContainer createAlbumUrl={this.createAlbumUrl} />
        <ManuelAddingAlbum createAlbumUrl={this.createAlbumUrl} />
        <br />
        <RelationshipSubmitter albums={this.props.albums} />
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('albums');
  return {
    albums: Albums.find({}).fetch(),
  };
}, AdminDashboard);
