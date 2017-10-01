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
          overlay={<CardTitle title={props.artist.artistName} />}
        >
          <img src={props.artist.SpotifyArtistObject.images[2].url} alt="" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          <AlbumListForArtist />
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    </div>
  );

Artist.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default Artist;
