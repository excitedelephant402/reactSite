import React from 'react';
import "../App.css";

export default function Aggregator(props) {
    return (
        <div class="cart">
        <h2>Cart</h2>
          {props.cost === 0 ? <p>Nothing in cart yet</p> : 
          
          <div>

            {Array.from(props.cart.entries()).map((entry, index) => 
            (entry[1] > 0 ?
              <div class="itemListed" key={index}>
                <p>{entry[1]} x {entry[0]}</p>
              </div>
            : 
            <div></div> ))
            
            }
            
            <p><b>Total:</b> {props.cost}</p>
          </div>
          
          }
      </div>
  
    )
  }