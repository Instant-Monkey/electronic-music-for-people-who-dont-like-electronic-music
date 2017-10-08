import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';
import AdminAlbum from '../albums/AdminAlbum.js';

export default class AlbumFieldSearch extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.reasearchAlbum = this.reasearchAlbum.bind(this);
    this.renderAlbumFound = this.renderAlbumFound.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
    this.state = {
      searchResults: [],
    };
  }
  onNewRequest(value) {
    const id = this.props.id;
    this.props.handleACClick(value, id);
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
  renderAlbumFound() {
    const albumFound = this.props.albumFound;
    if (albumFound.albumId !== undefined) {
      return <AdminAlbum album={albumFound} />;
    }
    return null;
  }
  render() {
    return (
      <div className="album-field-search-container col s12 m6 l3 ">
        <AutoComplete
          hintText="search album"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.state.searchResults}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.onNewRequest}
          maxSearchResults={5}
        />
        {this.renderAlbumFound()}
      </div>
    );
  }
}


AlbumFieldSearch.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  albumFound: PropTypes.object.isRequired,
  handleACClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
