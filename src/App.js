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
      ShoppingCart: [
        { id: 1, value: 'Big Mac', qty: 1, cost: 5 },
        { id: 2, value: 'French fries', qty: 2, cost: 2},
        { id: 3, value: '0.5L Coca Cola', qty: 1, cost: 2.3},
        { id: 4, value: 'Cheese dip', qty: 3, cost: 0.5 }
      ],
      TotalCost: 12.8
    };

  }

  IncreaseAmount = (id, cost) => {
    let NewShoppingCart = [...this.state.ShoppingCart];
    NewShoppingCart[id-1].qty += 1;
    let NewCost = this.state.TotalCost;
    NewCost = NewCost + cost;
    this.setState({ ShoppingCart: NewShoppingCart, TotalCost: NewCost});
    // console.log(NewShoppingCart);
  }

  DecreaseAmount = (id, cost) => {
    let NewShoppingCart = [...this.state.ShoppingCart];
    NewShoppingCart[id-1].qty -= 1;
    let NewCost = this.state.TotalCost;
    NewCost = NewCost - cost;
    this.setState({ ShoppingCart: NewShoppingCart, TotalCost: NewCost});
    // console.log(NewCost);
  }

  DeleteProduct = (id, qty, cost) => {
    let NewShoppingCart = [...this.state.ShoppingCart];
    NewShoppingCart.splice(id-1, 1);
    let NewCost = this.state.TotalCost;
    let LostCost = qty * cost;
    NewCost = NewCost - LostCost
    this.setState({ ShoppingCart: NewShoppingCart, TotalCost: NewCost});
  }

  
  render()
  {
    return <div className="CheckoutArea">
      <CheckoutTitle />
      <div className="CheckoutContent">
        <ShoppingCart 
          contents={ this.state.ShoppingCart } 
          IncreaseAmount={this.IncreaseAmount}
          DecreaseAmount={this.DecreaseAmount}
          DeleteProduct={this.DeleteProduct}
        />
        <div className="CheckoutInfo">
          < TotalCostBox Totalcost={ this.state.TotalCost } />
        </div>
      </div>
    </div>
  }
}



export default App;