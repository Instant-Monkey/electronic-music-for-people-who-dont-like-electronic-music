import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const AlbumInArtist = props =>
  (
    <ListItem
      primaryText={props.album.albumInfo.albumName}
      leftAvatar={<Avatar src="images/ok-128.jpg" />}
    />
  );

AlbumInArtist.propTypes = {
  album: PropTypes.object.isRequired,
};

export default AlbumInArtist;
