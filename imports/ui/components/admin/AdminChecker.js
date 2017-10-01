import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './AccountsUIWrapper.js';
import AdminDashboard from './AdminDashboard.js';

export default class AdminChecker extends Component {
  isItAdmin() {
    // Get the id of current user
    const userId = Meteor.userId();
    if (userId) {
      // call a server method which returns true if current user is Admin
      Meteor.call('checkAdminId', userId, (err, authorized) => {
        if (err) {
          console.log(err);
          return null;
        }
        return (authorized) ? <AdminDashboard /> : null;
      });
    }
  }
  render() {
    return (
      <div className="admin-temp-container">
        <h1> Admin Dashboard </h1>
        {
          // <AccountsUIWrapper />
        }
        <AdminDashboard />
      </div>
    );
  }
}
