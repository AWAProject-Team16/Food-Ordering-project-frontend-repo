import styles from "./../css/PaymentView/PaymentPage.module.css";
import React, { Component } from "react";
import PaymentProviders from "./PaymentProviders";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDiaglog from "./ConfirmationDiaglog";
import { CartContext } from "../context/Contexts";

const API_ADDRESS = process.env.REACT_APP_API_ADDRESS;

class PaymentPage extends Component {
  static contextType = CartContext; //thuc

  constructor(props) {
    super(props);

    this.state = {
      PaymentProviders: [
        { id: 1, name: "Visa Electron", type: "credit card", expanded: false },
        { id: 2, name: "Mastercard", type: "credit card", expanded: false },
        { id: 3, name: "Paypal", type: "bank", expanded: false },
        { id: 4, name: "Danske Bank", type: "bank", expanded: false },
        { id: 5, name: "Nordea", type: "bank", expanded: false },
        { id: 6, name: "OP", type: "bank", expanded: false },
        { id: 7, name: "Handelsbanken", type: "bank", expanded: false },
        { id: 8, name: "Aktia", type: "bank", expanded: false },
      ],
      TotalCost: 0,
      DeliveryCost: 0,
      DeliveryLocation: "",
      RestaurantID: 0,
      ShoppingCart: [],

      isModalOpen: false,
    };
  }

  toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen });

  componentDidMount() {
    let ShoppingCart = localStorage.getItem("ShoppingCart");
    ShoppingCart = JSON.parse(ShoppingCart);
    let DeliveryCost = parseInt(localStorage.getItem("DeliveryCost"));
    let TotalCost = 0;
    if (Array.isArray(ShoppingCart)) {
      TotalCost = this.CostCalc(ShoppingCart, DeliveryCost);
    }
    let DeliveryLocation = localStorage.getItem("DeliveryLocation");
    let Restaurant = parseInt(localStorage.getItem("RestaurantID"));
    this.setState({
      TotalCost: TotalCost,
      DeliveryCost: DeliveryCost,
      DeliveryLocation: DeliveryLocation,
      RestaurantID: Restaurant,
      ShoppingCart: ShoppingCart,
    });
  }

  SelectProvider = (id) => {
    let ProvidersArray = [...this.state.PaymentProviders];
    let indexnumber = this.Indexfinder(ProvidersArray, id);
    if (ProvidersArray[indexnumber].expanded === false) {
      let currentOpen = ProvidersArray.findIndex((Provider) => Provider.expanded === true);
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
  };

  Indexfinder(ArraytoSearch, id) {
    return ArraytoSearch.findIndex((Item) => Item.id === id);
  }

  AddOrder = () => {
    this.toggleModal();
    setTimeout(async () => {
      let ShoppingCart = this.state.ShoppingCart;
      let DeliveryLocation = this.state.DeliveryLocation;
      let Restaurant = this.state.RestaurantID;
      const JWTtoken = localStorage.getItem("appAuthData");
      let TotalCost = this.state.TotalCost;

      const orderInfo = {
        restaurants_idrestaurants: Restaurant,
        order_delivery_location: DeliveryLocation,
        order_total_cost: TotalCost,
        ShoppingCart: ShoppingCart,
      };

      const response = await axios.post(API_ADDRESS + "/orders/addOrder", orderInfo, {
        headers: { Authorization: `Bearer ${JWTtoken}` },
      });

      if (response.status === 201) {
        const redirectToOrderHistory = () => {
          this.context.CartCounter(0);
          toast.dismiss();
          this.props.navigateHook("/orders");
          localStorage.removeItem("ShoppingCart");
          localStorage.removeItem("RestaurantID");
          localStorage.removeItem("DeliveryLocation");
          localStorage.removeItem("DeliveryCost");
        };

        toast.success(
          <ConfirmationDiaglog text="Payment completed successfully" btn1Text="OK" btn1Callback={redirectToOrderHistory} />,
          {
            autoClose: false,
            closeOnClick: false,
          }
        );
      }
    }, 1000);
  };

  CostCalc(Cart, DeliveryCost) {
    let ProductCosts = Cart.reduce((total, product) => {
      return total + product.cost * product.qty;
    }, 0);
    return ProductCosts + DeliveryCost;
  }

  HandleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={styles.PaymentArea}>
        <div className={styles.PaymentTitle}>Please select your preferred payment method</div>
        <div className={styles.OrderCost}>The total cost of your current order is {this.state.TotalCost} €</div>
        <div>
          <PaymentProviders
            providers={this.state.PaymentProviders}
            SelectProvider={this.SelectProvider}
            AddOrder={this.AddOrder}
            HandleSubmit={this.HandleSubmit}
          />
          <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.toggleModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
              },
              content: {
                top: "40%",
                left: "40%",
                border: "none",
                background: "none",
              },
            }}
          >
            <div className={styles.processingText}>Processing your payment. Please wait...</div>
          </Modal>
        </div>
        <ToastContainer position="top-center" closeButton={false} />
      </div>
    );
  }
}

function WithUseNavigate(props) {
  const navigateHook = useNavigate();
  return <PaymentPage {...props} navigateHook={navigateHook} />;
}

export default WithUseNavigate;
