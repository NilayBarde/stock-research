import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",

      showStockInfo: false,

      currentPrice: 0
    };
  }

 getAllStockInformation = (companySymbolCombo) => {

    var currSymbol = null;
    for (var i=companySymbolCombo.length-1; i>0; i--) {
        if (companySymbolCombo.charAt(i) == "-") {
            currSymbol = companySymbolCombo.substring(i+2, companySymbolCombo.length);
        }
    }
    console.log(companySymbolCombo);
    console.log(currSymbol);

    const request = require('request');

    request('https://finnhub.io/api/v1/quote?symbol='+currSymbol+'&token=sandbox_bv5814v48v6qnlld0dng', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log(body.c);
      this.setState({
          currentPrice: body.c
      })
    });    

//     const socket = new WebSocket('wss://ws.finnhub.io?token=bv5814v48v6qnlld0dn0');

//   // Connection opened -> Subscribe
//     socket.addEventListener('open', function (event) {
//         // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//         socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//         // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
//     });

//     // Listen for messages
//     socket.addEventListener('message', function (event) {
//         console.log(event);
//       var parsedData = JSON.parse(event.data);
//       console.log(parsedData.data[0].p);
//       this.setState({
//         currentPrice: parsedData.data[0].p
//       })
//     }.bind(this));

    // // Unsubscribe
    // var unsubscribe = function(symbol) {
    //     socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
    // }

 }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
      showStockInfo: false
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    console.log("Clicked");
    this.getAllStockInformation(e.currentTarget.innerText);

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      showStockInfo: true
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
        this.getAllStockInformation(filteredSuggestions[activeSuggestion]);
        console.log("Key Down")
        this.setState({
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: filteredSuggestions[activeSuggestion],
            showStockInfo: true
        });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>Cannot find that stock symbol</em>
          </div>
        );
      }
    }

    return (
    <div>
        <Fragment>
            <input
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            />
            {suggestionsListComponent}
        </Fragment>
        {this.state.showStockInfo && (
            
            <h1>${this.state.currentPrice}</h1>
        )}
      </div>
    );
  }
}

export default Autocomplete;