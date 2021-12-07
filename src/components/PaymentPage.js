import styles from './../css/PaymentView/PaymentPage.module.css'
import React, { Component } from 'react'
import PaymentProviders from './PaymentProviders';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class PaymentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PaymentProviders: [
        { id: 1, name: 'Visa Electron', type: 'credit card', expanded: false },
        { id: 2, name: 'Mastercard', type: 'credit card', expanded: false },
        { id: 3, name: 'Paypal', type: 'bank', expanded: false },
        { id: 4, name: 'Danske Bank', type: 'bank', expanded: false },
        { id: 5, name: 'Nordea', type: 'bank', expanded: false },
        { id: 6, name: 'OP', type: 'bank', expanded: false },
        { id: 7, name: 'Handelsbanken', type: 'bank', expanded: false},
        { id: 8, name: 'Aktia', type: 'bank', expanded: false}
      ],
      TotalCost: 0,
      DeliveryCost: 0,
      DeliveryLocation: '',
      RestaurantID: 0,
      ShoppingCart: []
    }
  }

  componentDidMount() {
    let ShoppingCart = localStorage.getItem('ShoppingCart');
    ShoppingCart = JSON.parse(ShoppingCart)
    let DeliveryCost = parseInt(localStorage.getItem('DeliveryCost'))
    let TotalCost = this.CostCalc(ShoppingCart, DeliveryCost)
    let DeliveryLocation = localStorage.getItem('DeliveryLocation')
    let Restaurant = parseInt(localStorage.getItem('RestaurantID'))
    this.setState({ TotalCost: TotalCost, DeliveryCost: DeliveryCost, DeliveryLocation: DeliveryLocation, RestaurantID:Restaurant, ShoppingCart:ShoppingCart})
    // console.log(this.props.navigate)
  }

  SelectProvider = (id) => {
    let ProvidersArray = [...this.state.PaymentProviders];
    let indexnumber = this.Indexfinder(ProvidersArray, id);
    if (ProvidersArray[indexnumber].expanded === false) {
      let currentOpen = ProvidersArray.findIndex(Provider => Provider.expanded === true);
      if (currentOpen !== -1) {
        ProvidersArray[currentOpen].expanded = false;
        ProvidersArray[indexnumber].expanded = true;
        this.setState({ PaymentProviders: ProvidersArray });
      } else {
        ProvidersArray[indexnumber].expanded = true;
        this.setState({ PaymentProviders: ProvidersArray });
      }
    } else if (ProvidersArray[indexnumber].expanded === true) {
      ProvidersArray[indexnumber].expanded = false;
      this.setState({ PaymentProviders: ProvidersArray });
    }

  }

  Indexfinder(ArraytoSearch, id) {
    return (
      ArraytoSearch.findIndex(Item => Item.id === id)
    )
  }

  AddOrder = async () => {
    let ShoppingCart = this.state.ShoppingCart;
    let DeliveryLocation = this.state.DeliveryLocation;
    let Restaurant = this.state.RestaurantID;
    const JWTtoken = localStorage.getItem('appAuthData')
    // Restaurant = JSON.parse(Restaurant)
    let TotalCost = this.state.TotalCost
    // const TotalCost = ProductCosts + DeliveryCost
    // console.log(TotalCost)
    // console.log(`Bearer ${JWTtoken}`)
    console.log({ DeliveryLocation, JWTtoken, Restaurant, TotalCost, ShoppingCart})
    const response = await axios.post('http://localhost:5000/orders/addOrder', {restaurants_idrestaurants: Restaurant, order_delivery_location: DeliveryLocation, order_total_cost: TotalCost, ShoppingCart: ShoppingCart}, { headers: { 'Authorization': `Bearer ${JWTtoken}` } })
    console.log(response)
    this.props.navigateHook('/customers/orders')
    // console.log(Restaurant.Restaurant)


    // const article = { title: 'React POST Request Example' };
    // const test = await axios.post('https://reqres.in/api/articles', article);
    // console.log(test.data)

    // localStorage.removeItem('ShoppingCart')
    // localStorage.removeItem('Restaurant')
    // localStorage.removeItem('DeliveryLocation')
    // localStorage.removeItem('DeliveryCost')
  }

  CostCalc(Cart, DeliveryCost) {
    let ProductCosts = Cart.reduce((total, product) => {
      return total + (product.cost * product.qty)
    }, 0);
    return ProductCosts + DeliveryCost
  };

  HandleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className={styles.PaymentArea}>
        <div className={styles.PaymentTitle}>
          Please select your preferred payment method
        </div>
        <div className={styles.OrderCost}>
          The total cost of your current order is {this.state.TotalCost} €
        </div>
        <div>
          <PaymentProviders
            providers={this.state.PaymentProviders}
            SelectProvider={this.SelectProvider}
            AddOrder={this.AddOrder}
            HandleSubmit={this.HandleSubmit}
          />
        </div>
      </div>
    )
  }
}


function WithUseNavigate(props) {
  const navigateHook = useNavigate();
  return <PaymentPage {...props} navigateHook = {navigateHook} />
}

export default WithUseNavigate