import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state[0].map(el => (
            <li>
              {el.name}: {el.price_usd}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
