import React from 'react';
// import React, { useState, useEffect } from 'react';
import styles from '../css/RestaurantDetail.module.css';
import RestaurantProduct from './RestaurantProduct';
// import axios from 'axios';
// const API_ADDRESS = process.env.REACT_APP_API_ADDRESS
// var path  // idCategory

export default function RestaurantDetail(props) {
  // path = props.category.idcategories
  // console.log(path)
  // const [objProducts, setObjProducts] = useState([])
  // useEffect(() => {
  //   async function fetchData(x) {
  //     await axios.get(`${API_ADDRESS}/products/category/${x}`)
  //       .then((res) => {
  //         console.log(x)
  //         setObjProducts(res.data.Products)
  //         // console.log(objProducts)
  //         console.log(res.data.Products)
  //       })
  //       .catch(err => console.log(err))
  //   }
  //   fetchData(path);
  // }, [])
  // !!! gọi API n lần theo số lượng n category
  // !!! render ra chỉ 1 sản phẩm duy nhất của category cuối

  const objProducts = props.products.filter(item => item.categories_idcategories === props.category.idcategories)
  // const objProducts = props.products.filter(item => item.idcategories === props.category.idcategories)
  return (
    <div>
      <h3 id={props.category.idcategories} className={ styles.category }> { props.category.category_name } </h3>
      {
        objProducts.map(item =>  // !!!
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