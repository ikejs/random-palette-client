import React, { Component } from 'react';
import './App.css';

const fetchPalette = () => {
  fetch('/random')
  .then(colors => {
    this.setState({ colors })
  });
}

const savePalette = () => {
  fetch('/save', {
    method: "POST", 
    body: {
      1: "#NEW",
      2: "#NEW",
      3: "#NEW",
      4: "#NEW",
      5: "#NEW",
    }
  }).then(res => {
    if (res.status === 200) {
      alert("Palette saved.")
    }
  });
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Color Palette Generator</h1>
        <div className="paletteWrapper">
          <div className="color leftRounded"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color rightRounded"></div>
        </div>
        <button className="generateButton" onClick={()=> {
          fetchPalette()
        }}>Generate</button>
        <button className="saveButton" onClick={()=> {
          savePalette()
        }}>Save</button>
      </div>
    );
  }
}

export default App;
