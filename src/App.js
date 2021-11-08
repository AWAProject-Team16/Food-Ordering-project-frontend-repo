import React from "react";
import './App.css';
import CheckoutTitle from './components/CheckoutTitle';
import ShoppingCart from './components/ShoppingCart';
import TotalCostBox from "./components/Totalcost";

class App extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = {
      items: [
        { id: 1, value: 'Big Mac', qty: 1, cost: 5 },
        { id: 2, value: 'French fries', qty: 2, cost: 2},
        { id: 3, value: '0.5L Coca Cola', qty: 1, cost: 2.3},
        { id: 4, value: 'Cheese dip', qty: 3, cost: 0.5 }
      ]
    };

  }

  
  render()
  {
    return <div className="CheckoutArea">
      <CheckoutTitle />
      <div className="CheckoutContent">
        <ShoppingCart items={ this.state.items } />
        <div className="CheckoutInfo">
          < TotalCostBox />
        </div>
      </div>
    </div>
  }
}



export default App;