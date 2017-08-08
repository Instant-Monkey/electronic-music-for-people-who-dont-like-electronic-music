import React, { Component} from 'react';
import PropTypes from 'prop-types';

export default class Relationship extends Component {

getIndex(value, arr, prop) {
  for(var i = 0; i < arr.length; i++) {
      if(arr[i][prop] === value) {
          return arr[i];
      }
  }
  return -1; //to handle the case where the value doesn't exist
}

  render() {
    const albumSource = this.getIndex(this.props.relationship.source,this.props.albums, '_id');
    const albumTarget = this.getIndex(this.props.relationship.target,this.props.albums, '_id');
    return(
      <ul >
        <li>origin : {albumSource.albumName}</li>
        <li>target : {albumTarget.albumName}</li>
        <li>message : {this.props.relationship.weight}</li>
      </ul>
    );
  }
}

Relationship.propTypes = {
  relationship: PropTypes.object,
  albums: PropTypes.array,
};
