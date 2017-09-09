import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const ResultSearchAlbumStyle = {
  margin: '5%',
};

class ResultSearchAlbum extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.album);
  }
  render() {
    return (
      <div className="result-search-album-container col s12 m6 l3 xl2">
        <Card style={ResultSearchAlbumStyle}>
          <CardMedia>
            <img src={this.props.album.images[1].url} alt={`cover of ${this.props.album.name}`} />
          </CardMedia>
          <CardTitle title={this.props.album.name} subtitle={`by ${this.props.album.artists[0].name}`} />
          <CardActions>
            <FlatButton onClick={this.handleClick} label="Ajouter" />
          </CardActions>
        </Card>
      </div>
    );
  }
}


ResultSearchAlbum.propTypes = {
  album: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ResultSearchAlbum;
