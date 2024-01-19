import React, {useState, useRef, useEffect} from "react";
import "./Card.scss";
import { FaShoppingCart } from "react-icons/fa";
import {useDispatchCart, useCart} from './ContextReducer'

const Card = (props) => {
 
  let priceOptions = Object.keys(props.options || []);
  
  let cart = useCart();
  let dispatch = useDispatchCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(Object.keys(props.options || {})[0]); // Initialize 'size' state
  const [finalPrice, setFinalPrice] = useState(quantity * (parseInt(props.options[size]) || 0));
  const priceRef = useRef();
  
  const handleAddToCart = async () => {
    // console.log('Current quantity:', quantity);
    let optionPrice = props.options[size];
    let priceFromOptions = parseInt(optionPrice) || 0;
    // console.log('Price from options:', priceFromOptions);
    
    if (Array.isArray(cart.items)) {
      let existingItem = cart.items.find(
        (item) => item.id === props.foodItem._id && item.size === size
      );
  
      let updatedQuantity = parseInt(quantity);
      //  let updatedPrice = parseInt(props.foodItem.price) * updatedQuantity;
  
      if (existingItem) {
        updatedQuantity += parseInt(existingItem.quantity);
        // updatedPrice = parseInt(props.foodItem.price) * updatedQuantity;
      }
  
      let finalPrice = quantity * priceFromOptions;
      // console.log('Final price:', finalPrice);


      if (!isNaN(finalPrice)) {
        if (existingItem) {
          await dispatch({
            type: 'UPDATE',
            id: props.foodItem._id,
            price: finalPrice, 
            quantity: updatedQuantity,
          });
        } else {
          await dispatch({
            type: 'ADD',
            id: props.foodItem._id,
            image: props.foodItem.img,
            name: props.foodItem.name,
            price: finalPrice, 
            quantity: updatedQuantity,
            size: size,
        });
        }
      } else {
 
     
      }
    } else {
      console.error("'cart.items' is not an iterable array or doesn't exist");
      // Handle the scenario where 'cart.items' is not an iterable array or doesn't exist
    }

    let updatedFinalPrice = quantity * priceFromOptions;
    setFinalPrice(updatedFinalPrice); // Update the final price
  };

  useEffect(() => {
    let priceFromOptions = parseInt(props.options[size]) || 0;
    let updatedFinalPrice = quantity * priceFromOptions;
  
    // console.log('Final Price:', updatedFinalPrice);
  
    setFinalPrice(updatedFinalPrice);
  }, [quantity, size, props.options]); 

  return (
    <div className="card">
      <img src={props.foodItem.img} alt={props.foodItem.name} /> 
      <h2>{props.foodItem.name}</h2>

      <div className="options">
        <p>${finalPrice}</p>
        <select id="size" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
          {priceOptions.map((data) => (
            <option key={data} value={data}>
              {data}
            </option>
          ))}
        </select>

        <select id="quantity" onChange={(e) => setQuantity(e.target.value)}>
          {Array.from(Array(6), (e, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      
        <button className="button" onClick={handleAddToCart}>
          <FaShoppingCart className="cart-icon" />
        </button>
      </div>
    </div>
  );
};
 
export default Card;
