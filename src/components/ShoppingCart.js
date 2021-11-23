import React from 'react'
import TotalCostBox from "./Totalcost";
import ProductArea from "./ProductArea"
import styles from './../css/ShoppingCart.module.css'
import DeliveryLocation from './DeliveryLocation';
import { Link } from "react-router-dom";


class ShoppingCart extends React.Component {
    constructor(props)
    {
      super(props);
  
      this.state = {
        ShoppingCart: [],
        //   { id: 1, value: 'Big Mac', qty: 1, cost: 5 },
        //   { id: 2, value: 'French fries', qty: 2, cost: 2},
        //   { id: 3, value: '0.5L Coca Cola', qty: 1, cost: 2.3},
        //   { id: 4, value: 'Cheese dip', qty: 3, cost: 0.5 }
        // ],
        ProductCosts: 0,
        TotalCost: 0,
        DeliveryForm: '',
        DeliveryLocation: '',
        DeliveryCost: 0,
        isLocationSubmitted: false
      };
  
    }

    componentDidMount() {
      let ShoppingCartToStore = [
        { id: 1, value: 'Big Mac', qty: 1, cost: 5 },
        { id: 2, value: 'French fries', qty: 2, cost: 2},
        { id: 3, value: '0.5L Coca Cola', qty: 1, cost: 2.3},
        { id: 4, value: 'Cheese dip', qty: 3, cost: 0.5 }
      ];
      // localStorage.setItem('ShoppingCart', JSON.stringify(ShoppingCartToStore));
      let StorageCart = [];
      StorageCart = localStorage.getItem("ShoppingCart");
      StorageCart = JSON.parse(StorageCart);
      this.setState({ ShoppingCart: StorageCart })
      const ProductCostCalc = function(arr) {
        return arr.reduce((total, i) => {
          return total + (i.cost * i.qty)
        }, 0);
      };
      console.log(ProductCostCalc(ShoppingCartToStore));
      let ProductCosts = 0
      if (StorageCart) {
        ProductCosts = ProductCostCalc(StorageCart);
      }
      this.setState({ ProductCosts: ProductCosts, TotalCost: ProductCosts });
    }
  
    IncreaseAmount = (id, cost) => {
      let NewShoppingCart = [...this.state.ShoppingCart];
      let indexnumber = this.Indexfinder(NewShoppingCart, id)
      NewShoppingCart[indexnumber].qty += 1;
      let NewCost = this.state.ProductCosts;
      NewCost = NewCost + cost;
      NewCost = parseFloat(NewCost.toFixed(2));
      let NewTotalCost = NewCost + this.state.DeliveryCost
      this.setState({ ShoppingCart: NewShoppingCart, ProductCosts: NewCost, TotalCost: NewTotalCost});
      localStorage.setItem('ShoppingCart', JSON.stringify(this.state.ShoppingCart));
      // console.log(NewShoppingCart);
    }
  
    DecreaseAmount = (id, cost) => {
      let NewShoppingCart = [...this.state.ShoppingCart];
      let indexnumber = this.Indexfinder(NewShoppingCart, id)
      if (NewShoppingCart[indexnumber].qty > 1) {
        NewShoppingCart[indexnumber].qty -= 1;
        let NewCost = this.state.ProductCosts;
        NewCost = NewCost - cost;
        NewCost = parseFloat(NewCost.toFixed(2));
        let NewTotalCost = NewCost + this.state.DeliveryCost
        this.setState({ ShoppingCart: NewShoppingCart, ProductCosts: NewCost, TotalCost: NewTotalCost});
        localStorage.setItem('ShoppingCart', JSON.stringify(this.state.ShoppingCart));
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
      let NewCost = this.state.ProductCosts;
      let LostCost = qty * cost;
      NewCost = NewCost - LostCost
      NewCost = parseFloat(NewCost.toFixed(2));
      let NewTotalCost = NewCost + this.state.DeliveryCost
      this.setState({ ShoppingCart: NewShoppingCart, ProductCosts: NewCost, TotalCost: NewTotalCost});
      localStorage.setItem('ShoppingCart', JSON.stringify(NewShoppingCart));
    }

    AddProduct = (id, value, qty, cost) => {
      let StorageCart = localStorage.getItem("ShoppingCart");
      StorageCart = JSON.parse(StorageCart)
      if(Array.isArray(StorageCart)) {
        let indexnumber = StorageCart.findIndex(Product => Product.id === id);
        if(indexnumber === -1) {
          StorageCart.push({id: id, value: value, qty: qty, cost: cost});
        } else {
          StorageCart[indexnumber].qty += qty;
        }
        localStorage.setItem('ShoppingCart', JSON.stringify(StorageCart))
      } else {
        let StorageCart = [];
        StorageCart.push({id: id, value: value, qty: qty, cost: cost})
        console.log(StorageCart)
        localStorage.setItem('ShoppingCart', JSON.stringify(StorageCart))
      }
      // StorageCart.push({id: id, value: value, qty: qty, cost: cost})
      console.log(StorageCart)
      // localStorage.setItem('ShoppingCart', JSON.stringify(StorageCart))
    }

    Indexfinder (ArraytoSearch, id) {
      return (
        ArraytoSearch.findIndex(Item => Item.id === id)
      )
    }

    UpdateLocation = (event) => {
      this.setState({ DeliveryForm: event.target.value });
    }

    LocationSubmitted = (event) => {
      event.preventDefault();
      console.log(this.state.isLocationSubmitted)
      const DeliveryCost = 5;
      let NewCost = this.state.TotalCost
      NewCost = NewCost + DeliveryCost
      let DeliveryLocation = this.state.DeliveryForm
      this.setState({ isLocationSubmitted: true, DeliveryCost: DeliveryCost, TotalCost: NewCost, DeliveryLocation: DeliveryLocation })
    }
  
    
    render()
    {
      return <div className={styles.CheckoutArea}>
        <h1 className={styles.CheckoutTitle}>
            Checkout
        </h1>
        <div className={styles.CheckoutContent}>
          <ProductArea 
            Products={ this.state.ShoppingCart }
            ProductCosts={ this.state.ProductCosts } 
            IncreaseAmount={ this.IncreaseAmount }
            DecreaseAmount={ this.DecreaseAmount }
            DeleteProduct={ this.DeleteProduct }
          />
          <div className={styles.CheckoutInfo}>
            < DeliveryLocation 
            DeliveryForm={ this.state.DeliveryForm }
            DeliveryLocation={ this.state.DeliveryLocation }
            DeliveryCost={ this.state.DeliveryCost }
            UpdateLocation = { this.UpdateLocation } 
            LocationSubmitted = { this.LocationSubmitted }
            isLocationSubmitted = { this.state.isLocationSubmitted }
            />
            < TotalCostBox 
            ProductCosts={ this.state.ProductCosts }
            DeliveryCost={ this.state.DeliveryCost }
            TotalCost={ this.state.TotalCost }
            />
            <div>
              <Link to="/paymentpage" >
                <button className={styles.PaymentButton} >
                  <span className={styles.PaymentLink}>Proceed to payment</span>
                </button>
              </Link>
            </div>
            <button onClick={ () => this.AddProduct(6, "carrot", 5, 12)}>add carrot</button>
            <button onClick={ () => this.AddProduct(5, "salad", 2, 8)}>add salad</button>
          </div>
        </div>
      </div>
    }
  }
  

export default ShoppingCart
