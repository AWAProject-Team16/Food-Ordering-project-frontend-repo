import { BrowserRouter } from "react-router-dom";
import Nav from './components/Nav';
import Footer from './components/Footer';
import RouterURL from './router/RouterURL';
import RestaurantCreateNew from './components/RestaurantCreateNew';
import Register from './components/Register';

import styles from './App.module.css'
import React, { Component } from 'react'
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <RestaurantCreateNew />
        <div className= { styles.App }>
          <Nav />
          <RouterURL />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

// import './App.css';
// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Nav />
//         <RouterURL />
//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;