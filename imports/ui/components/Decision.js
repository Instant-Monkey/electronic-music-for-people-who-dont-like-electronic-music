import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Decision extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.relationship);
  }
  render() {
    return (
      <div className="decision-container">
        <button onClick={this.handleClick}>{this.props.relationship.message}</button>
      </div>
    );
  }
}


Decision.propTypes = {
  relationship: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Decision;
