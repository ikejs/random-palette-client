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
      loading: false,
      first: `hsl(0, 100%, 50%)`,
      second: `hsl(80, 100%, 50%)`,
      third: `hsl(160, 100%, 50%)`,
      fourth: `hsl(240, 100%, 50%)`,
      fifth: `hsl(320, 100%, 50%)`
    }
  }

  fetchPalette(hex) {
    this.setState({ loading: true });
    console.log((hex ? hex : 'no hex today'));
    const url = hex ? `/random/${hex}` : '/random';
      fetch(url)
      .then(res => res.json())
      .catch(() => {
        alert("Waking API. Try again in 5 seconds.");
      })
      .then(colors => {
        this.setState({loading: false, ...colors})
      });
  }

  componentDidMount() {
    this.fetchPalette("#79b452")
  }

  generateButton() {
    return (
      <button className={"generateButton" + (this.state.loading ? "disabled" : "")} onClick={()=> {
        this.fetchPalette()
      }}>{(this.state.loading ? "Loading..." : "Generate")}</button>
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Color Palette Generator</h1>
        <div className="paletteWrapper">
          <div className="color leftRounded" style={{backgroundColor: this.state.first.hsl}}>
            <p>{this.state.first.hex}</p>
          </div>
          <div className="color" style={{backgroundColor: this.state.second.hsl}}>
            <p>{this.state.second.hex}</p>
          </div>
          <div className="color" style={{backgroundColor: this.state.third.hsl}}>
            <p>{this.state.third.hex}</p>
          </div>
          <div className="color" style={{backgroundColor: this.state.fourth.hsl}}>
            <p>{this.state.fourth.hex}</p>
          </div>
          <div className="color rightRounded" style={{backgroundColor: this.state.fifth.hsl}}>
            <p>{this.state.fifth.hex}</p>
          </div>
        </div>
        <input type="text" className="HEXinput" value={this.state.third.hex} onChange={(e) => {
          this.fetchPalette(e.target.value)
        }}></input>
        {this.generateButton()}
        <button className="saveButton" onClick={()=> {
          savePalette()
        }}>Save</button>
      </div>
    );
  }
}

export default App;
