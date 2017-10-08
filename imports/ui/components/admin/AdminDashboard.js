import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

import Albums from '../../../api/albums.js';

import RelationshipsDashboard from './dashboards/RelationshipsDashboard.js';
import AlbumsDashboard from './dashboards/AlbumsDashboard.js';
import ArtistsDashboard from './dashboards/ArtistsDashboard.js';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.searchForWikipediaSummary = this.searchForWikipediaSummary.bind(this);
    this.renderActiveDashboard = this.renderActiveDashboard.bind(this);
    this.state = {
      activeDashboard: 'albums',
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
  handleListItemClick(target) {
    this.setState({
      activeDashboard: target,
    });
  }
  renderActiveDashboard() {
    switch (this.state.activeDashboard) {
      case 'albums':
        return <AlbumsDashboard createAlbumUrl={this.createAlbumUrl} />;
      case 'relationships':
        return <RelationshipsDashboard albums={this.props.albums} />;
      case 'artists':
        return <ArtistsDashboard albums={this.props.albums} artists={this.props.artists} />;
      default:
        return <AlbumsDashboard createAlbumUrl={this.createAlbumUrl} />;
    }
  }
  render() {
    return (
      <div className="admin-dashboard">
        <AppBar
          title={`Admin Dashboard : ${this.state.activeDashboard}`}
          showMenuIconButton={false}
        />
        <div className="admin-dashboard-container row">
          <div style={{ height: 20 }} />
          <Paper className="col s2"zDepth={1}>
            <List >
              <ListItem
                primaryText="Albums"
                onClick={() => this.handleListItemClick('albums')}
              />
              <ListItem
                primaryText="Relationships"
                onClick={() => this.handleListItemClick('relationships')}
              />
              <ListItem
                primaryText="Artists"
                onClick={() => this.handleListItemClick('artists')}
              />
            </List>
          </Paper>
          <div className="admin-dashboard-content col s10" >
            <Paper zDepth={2} style={{ padding: 10 }} >
              {this.renderActiveDashboard()}
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('albums');
  return {
    albums: Albums.find({ type: 'album' }).fetch(),
    artists: Albums.find({ type: 'artist' }).fetch(),
  };
}, AdminDashboard);
