import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const AdminAlbum = props =>
  (
    <div className="album-container">
      <Card>
        <CardMedia
          overlay={<CardTitle title={props.album.albumInfo.albumName} />}
          className="admin-album-image-container"
        >
          <img src={props.album.albumInfo.SpotifyAlbumObject.images[0].url} alt="" className="admin-album-image" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    </div>
  );

AdminAlbum.propTypes = {
  album: PropTypes.object.isRequired,
};

export default AdminAlbum;
