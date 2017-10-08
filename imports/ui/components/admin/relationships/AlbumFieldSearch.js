import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';


export default class AlbumFieldSearch extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.reasearchAlbum = this.reasearchAlbum.bind(this);
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
    const newSearchResults = albumResults.map(album => album.albumInfo.albumName);
    console.log(newSearchResults);
    this.setState({
      searchResults: newSearchResults,
    });
  }
  render() {
    return (
      <div className="album-field-search-container">
        <AutoComplete
          hintText="search album"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.state.searchResults}
          onUpdateInput={this.handleUpdateInput}
        />
      </div>
    );
  }
}


AlbumFieldSearch.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
