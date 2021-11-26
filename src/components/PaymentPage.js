import styles from './../css/PaymentView/PaymentPage.module.css'
import React, { Component } from 'react'
import PaymentProviders from './PaymentProviders';

export default class PaymentPage extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      PaymentProviders: [
        {id: 1, name: 'Visa Electron', type: 'credit card', expanded: false},
        {id: 2, name: 'Mastercard', type: 'credit card', expanded: false},
        {id: 3, name: 'Paypal', type: 'bank', expanded: true},
        {id: 4, name: 'Danske Bank', type: 'bank', expanded: false},
        {id: 5, name: 'Nordea', type: 'bank', expanded: false},
        {id: 6, name: 'OP', type: 'bank', expanded: false}
      ]
    }
  }

  SelectProvider = (id) => {
    let ProvidersArray = [...this.state.PaymentProviders];
    let indexnumber = this.Indexfinder(ProvidersArray, id);
    if(ProvidersArray[indexnumber].expanded == false) {
      let currentOpen = ProvidersArray.findIndex(Provider => Provider.expanded === true);
      if(currentOpen != -1) {
        ProvidersArray[currentOpen].expanded = false;
        ProvidersArray[indexnumber].expanded = true;
        this.setState({ PaymentProviders: ProvidersArray});
      } else {
        ProvidersArray[indexnumber].expanded = true;
        this.setState({ PaymentProviders: ProvidersArray});
      }
    } else if (ProvidersArray[indexnumber].expanded == true) {
      ProvidersArray[indexnumber].expanded = false;
      this.setState({ PaymentProviders: ProvidersArray});
    }

  } 
  
  Indexfinder (ArraytoSearch, id) {
    return (
      ArraytoSearch.findIndex(Item => Item.id === id)
    )
  }

  
  render() {
    return (
      <div>
        Please select your payment method
        <div>
          <PaymentProviders
          providers = { this.state.PaymentProviders }
          SelectProvider = { this.SelectProvider }
          />
        </div>
      </div>
    )
  }
}
