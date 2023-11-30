// CartTable.jsx
import React from 'react';
import './Cart.scss';
import {useCart, useDispatchCart} from '../components/ContextReducer'
import { FaTrash } from 'react-icons/fa';


const Cart = () => {
let data = useCart();
let dispatch = useDispatchCart();

if (data.length === 0){
    return(
        <div>
            <h3>The cart is empty</h3>
        </div>
    )
}
let totalPrice = data.reduce((total, food) => total + food.price,0)


  return (
    <div className="cart-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Option</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food , index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{food.name}</td>
              <td>{food.quantity}</td>
              <td>{food.size}</td>
              <td>${food.price}</td>
              <td><button type = 'button'><FaTrash onClick={() =>{dispatch({type:'Remove',index:index})}}/> </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div><h1>Total Price:{totalPrice}</h1></div>
      <button>Check Out</button>
    </div>
  );
};

export default Cart;
