import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const AlbumInArtist = props =>
  (
    <ListItem
      primaryText="Brendan Lim"
      leftAvatar={<Avatar src="images/ok-128.jpg" />}
    />
  );

AlbumInArtist.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default AlbumInArtist;
