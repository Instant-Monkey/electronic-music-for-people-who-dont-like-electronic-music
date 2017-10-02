import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import AlbumListForArtist from './AlbumListForArtist.js';

const Artist = props =>
  (
    <div className="artist-container col s12 m6 l3">
      <Card>
        <CardMedia
          overlay={<CardTitle title={props.artist.artistInfo.artistName} />}
          className="admin-artist-image-container"
        >
          <img src={props.artist.artistInfo.SpotifyArtistObject.images[0].url} alt="" className="admin-artist-image" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          <AlbumListForArtist albums={props.albums} />
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    </div>
  );

Artist.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.object.isRequired,
};

export default Artist;
