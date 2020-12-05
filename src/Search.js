// import React from "react";
// import Autocomplete from "./Autocomplete";

// require("./search.css");

// class Search extends React.Component {
//     getAllStocks() {
//         const request = require('request');
    
//         request('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bv5814v48v6qnlld0dn0', { json: true }, (err, res, body) => {
//           if (err) { return console.log(err); }
//           console.log(body);
//         });
//       }

//     render() {
//         return (
//             <div>
//                 {this.getAllStocks}
//                 <h1>Search a stock!</h1>
//                 <Autocomplete
//                     suggestions={[
//                     "Alligator",
//                     "Bask",
//                     "Crocodilian",
//                     "Death Roll",
//                     "Eggs",
//                     "Jaws",
//                     "Reptile",
//                     "Solitary",
//                     "Tail",
//                     "Wetlands"
//                     ]}
//                 />
//             </div>
//         );
//     }   
// }

// export default Search;
