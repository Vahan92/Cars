import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Cars from './components/Cars';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Cars />
        </div>
      </Provider>
    );
  }
}

export default App;
