import styles from '../css/RestaurantDetail.module.css';
import RestaurantProduct from './RestaurantProduct';

import React from 'react';
export default function RestaurantDetail(props) {
  const objProducts = props.products.filter(item => item.idcategories === props.category.idcategories)
  return (
    <div>
      <h3 id={props.category.idcategories} className={ styles.category }> { props.category.category_name } </h3>
      {
        objProducts.map(item =>
          <RestaurantProduct item={item} key={item.idproducts}/>
      )}
    </div>
  )
}

// import React, { Component } from 'react';
// Modal.setAppElement('#root');
// export default class RestaurantDetail extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { clickBuy:false }
//   }

//   openClickBuy = () => {
//     this.setState({clickBuy: true});
//   };

//   closeClickBuy = () => {
//     this.setState({clickBuy:false})
//   }
  
//   render() {
//     const objProducts = this.props.products.filter(item => item.idcategories === this.props.category.idcategories)
//     const { clickBuy } = this.state;

//     return (
//       <div>
//         <h3 id={ this.props.category.idcategories } className={ styles.category }> { this.props.category.name } </h3>
//         {
//           objProducts.map(item =>
//             <div className={ styles.product } key={ item.idproducts } onClick={ this.openClickBuy }>
//               <div className={ styles.productLeft }>
//                 <div className={ styles.name }> { item.name } </div>
//                 <div className={ styles.description }> { item.description } </div>
//                 <div className={ styles.price }> { '$ ' + item.price } </div>
//               </div>
//               <div className={ styles.productRight }>
//                 <img alt="true" className={styles.imageM} src={`/images/${item.image}`} />
//               </div>
//               <Modal isOpen={ clickBuy } >
//                 <ModalClickBuy item={ item } closeClickBuy={ this.closeClickBuy }/>
//               </Modal>
//             </div>
//         )}
//       </div>
//     )
//   }
// }