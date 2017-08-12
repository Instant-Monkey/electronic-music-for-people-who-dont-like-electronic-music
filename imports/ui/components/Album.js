import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Album = props => (
  <div className="album-container">
    <h2>{props.album.albumName}</h2>
  </div>
);

Album.propTypes = {
  album: PropTypes.object.isRequired,
};

export default Album;
