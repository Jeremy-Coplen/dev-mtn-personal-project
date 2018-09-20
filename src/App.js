import React, { Component } from 'react';
import { HashRouter as Router } from "react-router-dom"

import NavBar from "./Components/NavBar/NavBar"
import routes from "./routes"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar />
            {routes}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
