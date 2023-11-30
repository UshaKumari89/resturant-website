import React, {useState, useRef, useEffect} from "react";
import "./Card.scss";
import { FaShoppingCart } from "react-icons/fa";
import {useDispactchCart, useCart} from './ContextReducer'



const Card = (props) => {
  //  const { itemName, itemImage, itemPrice, itemOption } = props;
  let priceOptions = Object.keys( props.options || []); 
  
  let data = useCart()
  let dispatch = useDispactchCart()
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('')
  const priceRef = useRef()
  

  const handleAddToCart = async () => {
    console.log("Adding to cart:", {
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      quantity: quantity,
      size: size,
    });
  
    await dispatch({
      type: 'ADD',
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      quantity: quantity,
      size: size,
    });
  
    console.log("Cart after adding:", data);
  };
  
 let finalPrice = quantity * parseInt(props.options[size])

 useEffect(()=>{
  setSize(priceRef.current.value)
 }, [])

  return (
    <div className="card">
      <img src={props.foodItem.img} alt={props.foodItem.name} /> 
      <h2>{props.foodItem.name}</h2>

      <div className="options">
        <p>${finalPrice}</p>
        <select id="size" ref= {priceRef} onChange ={(e) => setSize(e.target.value)}>
          {priceOptions.map((data) => (
            <option key={data} value={data}>
              {data}
            </option>
          ))}
        </select>

        <select id="quantity" onChange ={(e) => setQuantity(e.target.value)}>
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
