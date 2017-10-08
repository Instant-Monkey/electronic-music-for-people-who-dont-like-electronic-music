import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

export default class RelationshipConfig extends Component {
  constructor(props) {
    super(props);
    this.updateMessage = this.updateMessage.bind(this);
  }
  updateMessage(event, newValue) {
    event.preventDefault();
    this.props.updateMessage(newValue);
  }
  render() {
    return (
      <div className="relationship-config-container col s12 m12 l6">
        <TextField
          hintText="Hint Text"
          value={this.props.message}
          onChange={this.updateMessage}
        />
        <RaisedButton
          label="Valider Relation"
          primary
          style={style}
          onClick={this.props.handleRelationshipSubmit}
        />
      </div>
    );
  }
}

RelationshipConfig.propTypes = {
  message: PropTypes.string.isRequired,
  updateMessage: PropTypes.func.isRequired,
  handleRelationshipSubmit: PropTypes.func.isRequired,
};
