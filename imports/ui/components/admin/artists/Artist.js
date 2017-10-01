import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Artist = props =>
  (
    <li className="artist-container">
      {props.artist.artistName}
    </li>
  );

Artist.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default Artist;
