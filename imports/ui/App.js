import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AdminDashboard from './components/admin/AdminDashboard.js';
import Main from './components/Main.js';

const App = () => (
  <Router>
    <div className="app-container">
      <Route exact path="/" component={Main} />
      <Route path="/admin" component={AdminDashboard} />
    </div>
  </Router>
);

export default App;
