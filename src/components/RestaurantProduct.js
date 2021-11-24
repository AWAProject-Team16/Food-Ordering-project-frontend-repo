import styles from '../css/RestaurantDetail.module.css';
import Modal from 'react-modal'
import ModalClickBuy from './ModalClickBuy';

import React, { useState } from 'react';
Modal.setAppElement('#root');
export default function RestaurantDetail(props) {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
      <div className={ styles.product } key={ props.item.idProduct } 
        onClick={() => { setModalOpen(true) }}>
        <div className={ styles.productLeft }>
          <div className={ styles.name }> { props.item.name } </div>
          <div className={ styles.description }> { props.item.description } </div>
          <div className={ styles.price }> { '$ ' + props.item.price } </div>
        </div>
        <div className={ styles.productRight }>
          <img alt="true" className={styles.imageM} src={`/images/${props.item.image}`} />
        </div>
      </div>
      {/* {modalOpen && <ModalClickBuy handleModalOpen={setModalOpen} item={ props.item }/>} */}
      <Modal isOpen={modalOpen}>
        <ModalClickBuy handleModalOpen={setModalOpen} item={ props.item }/>
      </Modal>
    </div>
  )
}