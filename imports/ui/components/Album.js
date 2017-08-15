import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Album extends Component {
  constructor(props) {
    super(props);
    this.renderAlbum = this.renderAlbum.bind(this);
  }
  renderAlbum() {
    if (this.props.album.defaultAlbum) {
      return <h2>Commencez par nous donner vos goûts</h2>;
    }
    return (
      <div className="single-album-container">
        <h2>{"Essayez d'écouter"} : {this.props.album.albumName}
          {' par'} {this.props.album.artistName}</h2>
        <img
          src={this.props.album.SpotifyAlbumObject.images[1].url}
          alt={this.props.album.albumName}
        />
        <iframe
          src={`https://embed.spotify.com/?uri=${this.props.album.SpotifyAlbumObject.uri}`}
          title="spotify Iframe"
          width="300"
          height="380"
          frameBorder="0"
          allowTransparency="true"
        />
      </div>
    );
  }
  render() {
    return (
      <div className="album-container">
        {this.renderAlbum()}
      </div>
    );
  }
}

Album.propTypes = {
  album: PropTypes.object.isRequired,
};

export default Album;
