import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import {Albums} from '../api/albums.js';
import {Relationships} from '../api/relationships.js';

import Relationship from './components/Relationship.js'
class App extends Component {

  constructor(props) {
   super(props);
   this.state = {
     album1Value: "",
     album2Value: "",
   };
 }

 componentWillReceiveProps(nextProps) {
  this.setState({album1Value: nextProps.albums[0]._id})
  this.setState({album2Value: nextProps.albums[0]._id})
 }

  handleAlbumSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const albumName = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Albums.insert({
      albumName,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  handleRelationshipSubmit(event) {
    event.preventDefault();
    const album1 = ReactDOM.findDOMNode(this).getElementsByClassName('album-1-select')[0].value;
    const album2 = ReactDOM.findDOMNode(this).getElementsByClassName('album-2-select')[0].value;
    const weightInput = ReactDOM.findDOMNode(this.refs.weightInput).value.trim();

    Relationships.insert({
      source: album1,
      target: album2,
      weight: weightInput,
      createdAt: new Date(), // current time
    });
  }

  handleSelectChange(event) {
    if (event.target.className == "album-1-select") { 
       this.setState({album1Value: event.target.value});
    } else if (event.target.className == "album-2-select") {
       this.setState({album2Value: event.target.value});
    }

 }

  renderAlbumsOption() {
    return this.props.albums.map((album) => (
      <option key={album._id} value={album._id}>{album.albumName}</option>
    ));
  }

  renderRelationships() {
    return this.props.relationships.map((rs) => (
      <Relationship key={rs._id} relationship={rs} albums={this.props.albums}/>
    ));
  }

  render() { 
    return (
      <div className="app-container">
        <h1>My awesome music guide</h1>

        <form className="new-album" onSubmit={this.handleAlbumSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add album"
            />
        </form>
        <br />
        <form >
          <select value={this.state.album1Value} className="album-1-select" onChange={this.handleSelectChange.bind(this)}>
            {this.renderAlbumsOption()}
          </select>
          <select value={this.state.album2Value} className="album-2-select" onChange={this.handleSelectChange.bind(this)}>
            {this.renderAlbumsOption()}
          </select>
          <input
            type="text"
            ref="weightInput"
            placeholder="what weight?"
          />
          <button onClick={this.handleRelationshipSubmit.bind(this)}>Nouvelle Relation </button>
        </form>
        <h2>Relationships</h2>
        <div className="relationship-container">
          {this.renderRelationships()}
        </div>
      </div>
    )
  }

}

App.propTypes = {
  albums: PropTypes.array.isRequired,
  relationships: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    albums: Albums.find({}).fetch(),
    relationships: Relationships.find({}).fetch(),
  };
}, App);
