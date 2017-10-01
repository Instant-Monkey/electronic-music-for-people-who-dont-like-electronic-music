import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import Album from './Album.js';
import Decision from './Decision.js';

import AutoComplete from 'material-ui/AutoComplete';

import Albums from '../../api/albums.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleDecision = this.handleDecision.bind(this);
    this.searchForArtist = this.searchForArtist.bind(this);
    this.state = {
      currentAlbum: {
        defaultAlbum: true,
      },
      /* {
        "_id": "tqytbngr9XruKZGr6",
        "albumInfo": {
          "albumName": "choix initial",
          "albumUrl": "choixinitialsylvain",
          "SpotifyAlbumObject": {}
        },
        "artistInfo": {
          "artistName": "sylvain",
          "SpotifyArtistObject": {}
        },
        "sourceNodes": [],
        "targetNodes": [
          {
            "albumId": "FCJbzdvdG5GRYPQ2A",
            "message": "J'aime le rap !"
          }
        ],
        "defaultAlbum": true,
        "createdAt": "2017-08-16T19:48:29.865Z"
      } */
      choiceHistory: [],
      searchArtistValue: '',
      searchResultsArtist: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    const defaultAlbum = nextProps.defaultAlbum;
    const joinedChoiceHistory = this.state.choiceHistory.concat(defaultAlbum);
    this.setState({
      currentAlbum: defaultAlbum,
      choiceHistory: joinedChoiceHistory,
    });
  }
  updateCurrentAlbum(albumId) {
    const newCurrentAlbum = Albums.findOne({ _id: albumId });
    const joinedChoiceHistory = this.state.choiceHistory.concat(newCurrentAlbum);
    this.setState({
      currentAlbum: newCurrentAlbum,
      choiceHistory: joinedChoiceHistory,
    });
  }
  handleDecision(decision) {
    this.updateCurrentAlbum(decision.albumId);
  }
  searchForArtist(value) {
    //  const albumSearched = this.albumSearchInput.value.trim();
    Meteor.call('searchForArtists', value, (error, result) => {
      if (result.length === 0) {
        console.log('pas de résultats');
      } else {
        this.setState({
          searchResultsArtist: [],
        });
        result.map((artobj) => {
          const tempState = this.state.searchResultsArtist;
          tempState.push(artobj.name);
          return this.setState({
            searchResultsArtist: tempState,
          });
        });
      }
    });
  }
  renderDecisions() {
    if (this.state.currentAlbum.targetNodes) {
      return this.state.currentAlbum.targetNodes.map(nodes => (
        <Decision relationship={nodes} key={nodes.albumId} onClick={this.handleDecision} />
      ));
    }
    return false;
  }
  render() {
    return (
      <div className="main-container">
        <h1> My awesome music guide </h1>
        <AutoComplete
          hintText="search for artists"
          dataSource={this.state.searchResultsArtist}
          onUpdateInput={this.searchForArtist}
        />
        <Album album={this.state.currentAlbum} />
        {this.renderDecisions()}
      </div>
    );
  }
}

Main.propTypes = {
  defaultAlbum: PropTypes.object,
};

Main.defaultProps = {
  defaultAlbum: {},
};

export default createContainer(() => {
  Meteor.subscribe('albums');
  return {
    defaultAlbum: Albums.findOne({ defaultAlbum: true }),
  };
}, Main);
