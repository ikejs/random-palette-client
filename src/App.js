import React, { Component } from 'react';
import './App.css';

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
  constructor() {
    super();

    this.state = { 
      first: `hsl(0, 100%, 50%)`,
      second: `hsl(80, 100%, 50%)`,
      third: `hsl(160, 100%, 50%)`,
      fourth: `hsl(240, 100%, 50%)`,
      fifth: `hsl(320, 100%, 50%)`
    }
  }

  fetchPalette() {
    fetch('/random')
    .then(res => res.json())
    .then(colors => {
      this.setState(colors)
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Color Palette Generator</h1>
        <div className="paletteWrapper">
          <div className="color leftRounded" style={{backgroundColor: this.state.first}}></div>
          <div className="color" style={{backgroundColor: this.state.second}}></div>
          <div className="color" style={{backgroundColor: this.state.third}}></div>
          <div className="color" style={{backgroundColor: this.state.fourth}}></div>
          <div className="color rightRounded" style={{backgroundColor: this.state.fifth}}></div>
        </div>
        <button className="generateButton" onClick={()=> {
          this.fetchPalette()
        }}>Generate</button>
        <button className="saveButton" onClick={()=> {
          savePalette()
        }}>Save</button>
      </div>
    );
  }
}

export default App;
