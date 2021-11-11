import React from 'react'
import CheckoutTitle from './CheckoutTitle';
import TotalCostBox from "./Totalcost";
import ProductArea from "./ProductArea"
import styles from './../css/ShoppingCart.module.css'

// const ShoppingCart = props => {
//     return <div className={styles.ShoppingCart}>
//         <div className={styles.ShoppingCartTitle}>
//             All products
//         </div>
//         {
//             props.contents.map(i => <ShoppingCartProduct {...i} 
//                                     IncreaseAmount={props.IncreaseAmount} 
//                                     DecreaseAmount={props.DecreaseAmount}
//                                     DeleteProduct={props.DeleteProduct}
//                                     key={ i.id }
//                                     />)
//         }
//     </div>
// }

class ShoppingCart extends React.Component {
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
      let indexnumber = this.Indexfinder(NewShoppingCart, id)
      NewShoppingCart[indexnumber].qty += 1;
      let NewCost = this.state.TotalCost;
      NewCost = NewCost + cost;
      NewCost = parseFloat(NewCost.toFixed(2));
      this.setState({ ShoppingCart: NewShoppingCart, TotalCost: NewCost});
      // console.log(NewShoppingCart);
    }
  
    DecreaseAmount = (id, cost) => {
      let NewShoppingCart = [...this.state.ShoppingCart];
      let indexnumber = this.Indexfinder(NewShoppingCart, id)
      if (NewShoppingCart[indexnumber].qty > 1) {
        NewShoppingCart[indexnumber].qty -= 1;
        let NewCost = this.state.TotalCost;
        NewCost = NewCost - cost;
        NewCost = parseFloat(NewCost.toFixed(2));
        this.setState({ ShoppingCart: NewShoppingCart, TotalCost: NewCost});
        // console.log(NewCost);
      } else {
      // console.log(NewCost);
        // console.log("ei näin")
        // this.DeleteProduct(id, 1, cost)
      }
    }
  
    DeleteProduct = (id, qty, cost) => {
      let NewShoppingCart = [...this.state.ShoppingCart];
      let indexnumber = this.Indexfinder(NewShoppingCart, id)
      NewShoppingCart.splice(indexnumber, 1);
      let NewCost = this.state.TotalCost;
      let LostCost = qty * cost;
      NewCost = NewCost - LostCost
      NewCost = parseFloat(NewCost.toFixed(2));
      this.setState({ ShoppingCart: NewShoppingCart, TotalCost: NewCost});
    }

    Indexfinder (ArraytoSearch, id) {
      return (
        ArraytoSearch.findIndex(Item => Item.id === id)
      )
    }
  
    
    render()
    {
      return <div className={styles.CheckoutArea}>
        <h1 className={styles.CheckoutTitle}>
            Checkout
        </h1>
        <div className={styles.CheckoutContent}>
          <ProductArea 
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
  

export default ShoppingCart
