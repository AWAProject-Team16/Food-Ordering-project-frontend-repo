import React, { useState } from 'react'

export default function ModalClickBuy(props) {
  const [quantity, setQuantity] = useState(1)
  function onDown() {
    let newQuantity =  quantity - 1
    setQuantity(newQuantity)
  }
  function onUp() {
    let newQuantity =  quantity + 1
    setQuantity(newQuantity)
  }
  return (
    <div>
      <button onClick={() => {props.handleModalOpen(false)}}>Close</button>
      <div>{ '$ ' + props.item.price }</div>
      <div onClick={ onDown }>-</div>
      <div>{ quantity }</div>
      <div onClick={ onUp }>+</div>
      <button onClick={() => console.log('clicked') }>Buy</button>
    </div>
  )
}