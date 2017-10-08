import React from 'react';
import PropTypes from 'prop-types';

const style = {
  fontSize: 16,
  textTransform: 'uppercase',
  color: '#424242',
};

const DashboardTitle = props => (
  <h1 style={style}>{props.primaryText}</h1>
);


DashboardTitle.propTypes = {
  primaryText: PropTypes.string.isRequired,
};

export default DashboardTitle;
