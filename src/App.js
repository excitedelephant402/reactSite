import "./App.css";
import { useState } from "react";
import itemData from "./assets/item-data.json";
import Item from "./components/Item";
import Aggregator from "./components/Aggregator";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
itemData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {


  const typeItems = [...new Set(itemData.map((Val) => Val.type))];
  const ageItems = [...new Set(itemData.map((Val) => Val.age))];
  const [cart, setCart] = useState(new Map());
  const [cost, setCost] = useState(0);

  const [data, setData] = useState(itemData);

  const [currAge, setAge] = useState("All");

  const [currType, setType] = useState("All");


  const addCart = (itemName, price) => {
    setCart(new Map(cart.set(itemName, cart.get(itemName) ? cart.get(itemName) + 1 : 1)))
    setCost(Math.round(100 * (cost + price))/100);
  }

  const removeCart = (itemName, price) => {
    setCost(cart.get(itemName) > 0 ? Math.round(100 * (cost - price))/100 : cost);
    setCart(new Map(cart.set(itemName, cart.get(itemName) ? cart.get(itemName) - 1 : 0)))
  }

  const filterItemType = (currcat) => {
    setType(currcat);
    const newItem = itemData.filter((newVal) => {
      if ((currcat === "All") && (currAge === "All")) {
        return true;
      }
      else if (currAge === "All") {
        return newVal.type === currcat;
      }
      else if (currcat === "All") {
        return newVal.age === currAge;
      }
      else if ((newVal.age === currAge) && (newVal.type === currcat)) {
        return true;
      }
      else {
        return false;
      }
    });
    setData(newItem);
  };

  const filterItemAge = (currage) => {
    setAge(currage);
    const newItem = itemData.filter((newVal) => {
      if ((currage === "All") && (currType === "All")) {
        return true;
      }
      else if (currage === "All") {
        return newVal.type === currType;
      }
      else if (currType === "All") {
        return newVal.age === currage;
      }
      else if ((newVal.age === currage) && (newVal.type === currType)) {
        return true;
      }
      else {
        return false;
      }
    });
    setData(newItem);
  };

  const dataAscending = [...data].sort((a, b) => a.price - b.price);

  const dataDescending = [...data].sort((a, b) => b.price - a.price);

  return (
    <div className="App">

      <div class="left">
        <h1>Katie's Toy Store</h1>
        <div class="inner-text">
          <div class="type">
            <h4>Filter by Type of Toy</h4>
            <div class="filter">
                {typeItems.map((Val, id) => {
                return (
                  <button
                    className={currType === Val ? 'active' : 'not-selected'}
                    key={id}
                    onClick={() => filterItemType(Val)}
                  >
                    {Val}
                  </button>
                );
              })}
                <button onClick={() => filterItemType("All")} className={currType === "All" ? 'active' : 'not-selected'}>
                  All
                </button>
              </div>
            </div>
            <div class="side-container">
              <div class="age">
                <h4>Filter by Age</h4>
                <div class="filter">
                  {ageItems.map((Val, id) => {
                  return (
                    <button
                      className={currAge === Val ? 'active' : 'not-selected'}
                      key={id}
                      onClick={() => filterItemAge(Val)}
                    >
                      {Val}
                    </button>
                  );
                })}
                  <button onClick={() => filterItemAge("All")} className={currAge === "All" ? 'active' : 'not-selected'}>
                    All
                  </button>
                </div>
              </div>
            </div>
            <div class="sort">
              <h4>Sort by Price</h4>
                <Dropdown>
                  <DropdownButton id="dropdown-autoclose-true" title="Sort Price">
                    <Dropdown.Item onClick={() => setData(dataAscending)}>Low to High</Dropdown.Item>
                    <Dropdown.Item onClick={() => setData(dataDescending)}>High to Low</Dropdown.Item>
                  </DropdownButton>
                </Dropdown>
            </div>
            </div>

        <div class="container">
          {data.length > 0 ? data.map((item, index) => ( 
            <Item item={item} key={index} addCart={addCart} removeCart={removeCart}></Item>
          )) : 
          <p>No results found based on filter. Click "All" on both categories to reset.</p>}
        </div>
      </div>

      <Aggregator cost={cost} cart={cart}></Aggregator>
      </div>
  );
}

export default App;
