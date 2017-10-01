import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import Albums from '../../../api/albums.js';

import ManuelAddingAlbum from './albums/ManuelAddingAlbum.js';
import AlbumSearchContainer from './albums/AlbumSearchContainer.js';
import RelationshipSubmitter from './relationships/RelationshipSubmitter.js';
import ArtistsList from './artists/ArtistsList.js';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.searchForWikipediaSummary = this.searchForWikipediaSummary.bind(this);
    this.renderArtistsList = this.renderArtistsList.bind(this);
    this.showArtistsList = this.showArtistsList.bind(this);
    this.manageButtonArtistMessage = this.manageButtonArtistMessage.bind(this);
    this.state = {
      listArtistDisplay: true,
      artistListMessage: 'Montrer les artistes',
    };
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
  showArtistsList() {
    const newArtistListState = !this.state.listArtistDisplay;
    this.setState({
      listArtistDisplay: newArtistListState,
    });
    this.manageButtonArtistMessage(newArtistListState);
  }
  manageButtonArtistMessage(show) {
    if (show) {
      this.setState({
        artistListMessage: 'Cacher les artistes',
      });
    } else {
      this.setState({
        artistListMessage: 'Montrer les artistes',
      });
    }
  }
  renderArtistsList() {
    return this.state.listArtistDisplay ? <ArtistsList albums={this.props.albums} /> : null;
  }
  render() {
    return (
      <div className="admin-temp-container">
        <AlbumSearchContainer createAlbumUrl={this.createAlbumUrl} />
        <br />
        <RelationshipSubmitter albums={this.props.albums} />
        <button onClick={this.showArtistsList}>{this.state.artistListMessage}</button>
        {this.renderArtistsList()}
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
