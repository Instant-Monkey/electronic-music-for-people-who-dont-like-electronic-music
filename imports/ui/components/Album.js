import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Album = props => (
  <div className="album-container">
    <h2>Essayez d'écouter : {props.album.albumName} par {props.album.artistName}</h2>
  </div>
);

Album.propTypes = {
  album: PropTypes.object.isRequired,
};

export default Album;
