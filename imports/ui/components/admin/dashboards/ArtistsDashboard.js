import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import DashboardTitle from '../smallComponents/DashboardTitle.js';
import ArtistsList from '../artists/ArtistsList.js';

export default class ArtistsDashboard extends Component {
  constructor(props) {
    super(props);
    this.filterArtists = this.filterArtists.bind(this);
    this.state = {
      filterFieldValue: '',
      artistsToShow: this.props.artists,
    };
  }
  filterArtists(e, value) {
    const artistsToShow = this.props.artists.filter(artist =>
      artist.artistInfo.artistName.toLowerCase().includes(value.toLowerCase()));
    this.setState({
      filterFieldValue: value,
      artistsToShow,
    });
  }
  render() {
    return (
      <div className="artist-dashboard-container">
        <DashboardTitle primaryText="all the artists" />
        <Divider />
        <TextField
          value={this.state.filterFieldValue}
          hintText="filter artists"
          onChange={this.filterArtists}
        />
        <ArtistsList
          artists={this.state.artistsToShow}
          albums={this.props.albums}
        />
      </div>
    );
  }
}

ArtistsDashboard.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
