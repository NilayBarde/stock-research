import './App.css';
import React from "react";
import Autocomplete from "./Autocomplete";


require("./search.css");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allStocks: []
    };
  }

  listifyStocks(stocksList) {
    var symbolList = [];
    for(var company of stocksList) {
      symbolList.push(company.symbol)
    }
    return symbolList;

  }

  componentDidMount() {
    fetch("https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bv5814v48v6qnlld0dn0")
      .then(res => res.json())
      .then(
        (result) => {
          var stockSymbolList = this.listifyStocks(result);
          console.log(stockSymbolList);
          this.setState({
            allStocks: stockSymbolList,
          });
        },
        (error) => {
          this.setState({
            allStocks: [],
            error
          });
        }
      )
  }

  // testApi() {
  //   const finnhub = require('finnhub');
 
  //   const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  //   api_key.apiKey = "sandbox_bv5814v48v6qnlld0dng"; // Replace this
  //   const finnhubClient = new finnhub.DefaultApi();

  //   // const request = require('request');

  //   // request('https://finnhub.io/api/v1/quote?symbol=AAPL&token=sandbox_bv5814v48v6qnlld0dng', { json: true }, (err, res, body) => {
  //   //   if (err) { return console.log(err); }
  //   //   console.log(body);
  //   // });    

  //   const socket = new WebSocket('wss://ws.finnhub.io?token=bv5814v48v6qnlld0dn0');

  //   // Connection opened -> Subscribe
  //   socket.addEventListener('open', function (event) {
  //       socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
  //       // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
  //       // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
  //   });

  //   // Listen for messages
  //   socket.addEventListener('message', function (event) {
  //     console.log(event.data);
  //     var parsedData = JSON.parse(event.data);
  //     this.setState({
  //       stockSymbol: parsedData.data[0].s,
  //       currentPrice: parsedData.data[0].p
  //     })
  //   }.bind(this));

  //   // Unsubscribe
  //   var unsubscribe = function(symbol) {
  //       socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
  //   }


  //   // // Stock candles
  //   // finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, {}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // //Company News
  //   // finnhubClient.companyNews("AAPL", "2020-01-01", "2020-05-01", (error, data, response) => {
  //   //     if (error) {
  //   //         console.error(error);
  //   //     } else {
  //   //         console.log(data)
  //   //     }
  //   // });
    
  //   // // Investor Ownership
  //   // let optsLimit = {'limit': 10};
  //   // finnhubClient.investorsOwnership("AAPL", optsLimit, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // //Aggregate Indicator
  //   // finnhubClient.aggregateIndicator("AAPL", "D", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Basic financials
  //   // finnhubClient.companyBasicFinancials("AAPL", "margin", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Company earnings
  //   // finnhubClient.companyEarnings("AAPL", {'limit': 10}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Company EPS estimates
  //   // finnhubClient.companyEpsEstimates("AAPL", {}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Company executive
  //   // finnhubClient.companyExecutive("AAPL", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Company peers
  //   // finnhubClient.companyPeers("AAPL", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Company profile
  //   // finnhubClient.companyProfile({'symbol': 'AAPL'}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
  //   // finnhubClient.companyProfile({'isin': 'US0378331005'}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
  //   // finnhubClient.companyProfile({'cusip': '037833100'}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // //Company profile2
  //   // finnhubClient.companyProfile2({'symbol': 'AAPL'}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Revenue Estimates
  //   // finnhubClient.companyRevenueEstimates("AAPL", {}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // List country
  //   // finnhubClient.country((error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Covid-19
  //   // finnhubClient.covid19((error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Crypto candles
  //   // finnhubClient.cryptoCandles("BINANCE:BTCUSDT", "D", 1590988249, 1591852249, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Crypto exchanges
  //   // finnhubClient.cryptoExchanges((error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // //Crypto symbols
  //   // finnhubClient.cryptoSymbols("BINANCE", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Earnings calendar
  //   // finnhubClient.earningsCalendar({"from": "2020-06-01", "to": "2020-06-30"}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Economic code
  //   // finnhubClient.economicCode((error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Economic data
  //   // finnhubClient.economicData("MA-USA-656880", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Filings
  //   // finnhubClient.filings({"symbol": "AAPL"}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // //Financials
  //   // finnhubClient.financials("AAPL", "ic", "annual", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Financials Reported
  //   // finnhubClient.financialsReported({"symbol": "AAPL"}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Forex candles
  //   // finnhubClient.forexCandles("OANDA:EUR_USD", "D", 1590988249, 1591852249, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Forex exchanges
  //   // finnhubClient.forexExchanges((error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Forex rates
  //   // finnhubClient.forexRates({"base": "USD"}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Forex symbols
  //   // finnhubClient.forexSymbols("OANDA", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // //Fund ownership
  //   // finnhubClient.fundOwnership("AAPL", {'limit': 10}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // General news
  //   // finnhubClient.generalNews("general", {}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Ipo calendar
  //   // finnhubClient.ipoCalendar("2020-01-01", "2020-06-15", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // //Major development
  //   // finnhubClient.majorDevelopments("AAPL", {}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // News sentiment
  //   // finnhubClient.newsSentiment("AAPL", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Pattern recognition
  //   // finnhubClient.patternRecognition("AAPL", "D", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Price target
  //   // finnhubClient.priceTarget("AAPL", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // //Quote
  //   // finnhubClient.quote("AAPL", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Recommendation trends
  //   // finnhubClient.recommendationTrends("AAPL", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Stock dividends
  //   // finnhubClient.stockDividends("KO", "2019-01-01", "2020-06-30", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Splits
  //   // finnhubClient.stockSplits("AAPL", "2000-01-01", "2020-06-15", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Stock symbols
  //   // finnhubClient.stockSymbols("US", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Support resistance
  //   // finnhubClient.supportResistance("AAPL", "D", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Technical indicator
  //   // finnhubClient.technicalIndicator("AAPL", "D", 1580988249, 1591852249, "macd", {}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Transcripts
  //   // finnhubClient.transcripts("AAPL_162777", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Transcripts list
  //   // finnhubClient.transcriptsList("AAPL", (error, data, response) => {
  //   //     console.log(data)
  //   // });
    
  //   // // Upgrade/downgrade
  //   // finnhubClient.upgradeDowngrade({"symbol": "AAPL"}, (error, data, response) => {
  //   //     console.log(data)
  //   // });
  // }

  render() {
    return (
      <div>
        <h1>Search a stock!</h1>
        <Autocomplete
            suggestions={this.state.allStocks}
        />
      </div>
    )
  }
}
export default App;
