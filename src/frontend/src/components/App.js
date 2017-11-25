import React, { Component } from 'react';
import smartOutline from 'smart-outline';
import MainPage from './MainPage'
smartOutline.init();

class App extends Component {
  render() {
    return (
      <MainPage />
    );
  }
}

export default App;
