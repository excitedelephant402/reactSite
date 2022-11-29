import React from 'react';
import "../App.css";


export default function Item(props) {
  return (
    <div class="Item">
        <img src={props.item.image} alt=""></img>
        <div class="description">
            <h4>{props.item.name}</h4>
            <p><b>Type:</b> {props.item.type}</p>
            <p><b>Age:</b> {props.item.age}</p>
            <p><b>Price:</b> {props.item.price}</p>
            <div class="bottomLine">
                <button class="item-button" onClick={() => props.addCart(props.item.name, props.item.price)}>Add to Cart</button>
                <button class="item-button" onClick={() => props.removeCart(props.item.name, props.item.price)}>Remove from Cart</button>
            </div>
        </div>
    </div>

  )
}
