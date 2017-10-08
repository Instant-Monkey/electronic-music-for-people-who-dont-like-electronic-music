import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';
import AdminAlbum from '../albums/AdminAlbum.js';

export default class AlbumFieldSearch extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.reasearchAlbum = this.reasearchAlbum.bind(this);
    this.handleACClick = this.handleACClick.bind(this);
    this.renderAlbumFound = this.renderAlbumFound.bind(this);
    this.state = {
      searchResults: [],
    };
  }
  reasearchAlbum(val) {
    return this.props.albums.filter((album) => {
      const albumName = album.albumInfo.albumName.toLowerCase();
      return albumName.includes(val);
    });
  }
  handleUpdateInput(value) {
    const sanValue = value.toLowerCase();
    const albumResults = this.reasearchAlbum(sanValue);
    const newSearchResults = albumResults.map(album => (
      { text: album.albumInfo.albumName,
        value: album.albumId,
      }
    ));
    this.setState({
      searchResults: newSearchResults,
    });
  }
  handleACClick(clicked) {
    const albumFound = this.props.albums.find(album => album.albumId === clicked.value);
    this.setState({
      albumFound,
    });
  }
  renderAlbumFound() {
    const albumFound = this.state.albumFound;
    if (albumFound !== undefined) {
      return <AdminAlbum album={albumFound} />;
    }
    return null;
  }
  render() {
    return (
      <div className="album-field-search-container">
        <AutoComplete
          hintText="search album"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.state.searchResults}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleACClick}
          maxSearchResults={5}
        />
        <div className="row">
          {this.renderAlbumFound()}
        </div>
      </div>
    );
  }
}


AlbumFieldSearch.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
