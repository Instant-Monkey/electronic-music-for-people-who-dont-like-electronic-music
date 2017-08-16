import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

class ManuelAddingAlbum extends Component {
  constructor(props) {
    super(props);
    this.handleManuelAlbumSubmit = this.handleManuelAlbumSubmit.bind(this);
    this.toogleDefaultCheckAlbum = this.toogleDefaultCheckAlbum.bind(this);
    this.state = {
      defaultCheckAlbum: false,
    };
  }
  handleManuelAlbumSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const albumName = this.albumInput.value.trim();
    const artistName = this.artistInput.value.trim();
    const albumUrl = this.props.createAlbumUrl(albumName, artistName);

    const album = {
      albumInfo: {
        albumName,
        albumUrl,
        SpotifyAlbumObject: {},
      },
      artistInfo: {
        artistName,
        SpotifyArtistObject: {},
      },
      defaultAlbum: this.state.defaultCheckAlbum,
    };
    Meteor.call('albums.insert', album);

    // Clear form
    this.albumInput.value = '';
    this.artistInput.value = '';
  }
  toogleDefaultCheckAlbum() {
    this.setState({
      defaultCheckAlbum: !this.state.defaultCheckAlbum,
    });
  }
  render() {
    return (
      <form className="new-album">
        <input
          type="text"
          ref={(node) => { this.albumInput = node; }}
          placeholder="Type to add album"
        />
        <input
          type="text"
          ref={(node) => { this.artistInput = node; }}
          placeholder="Type to add artist"
        />
        <input
          type="checkbox"
          readOnly
          checked={this.state.defaultCheckAlbum}
          onClick={this.toogleDefaultCheckAlbum}
          ref={(node) => { this.defaultCheckAlbum = node; }}
        />
        <button onClick={this.handleManuelAlbumSubmit}>Envoyer lalbum </button>
      </form>
    );
  }
}

ManuelAddingAlbum.propTypes = {
  createAlbumUrl: PropTypes.func.isRequired,
};

export default ManuelAddingAlbum;
