import React, { Component } from 'react';
import { HashRouter as Router } from "react-router-dom"

import { connect } from "react-redux"

import NavBar from "./Components/NavBar/NavBar"
import routes from "./routes"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar updateImageChanged={this.updateImageChanged} />
            {routes}
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
