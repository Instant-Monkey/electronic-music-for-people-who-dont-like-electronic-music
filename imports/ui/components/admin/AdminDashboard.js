import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import Albums from '../../../api/albums.js';

import ManuelAddingAlbum from './albums/ManuelAddingAlbum.js';
import AlbumSearchContainer from './albums/AlbumSearchContainer.js';
import RelationshipSubmitter from './relationships/RelationshipSubmitter.js';


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
        <Link to="admin/artists"> List of Artists</Link>
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
