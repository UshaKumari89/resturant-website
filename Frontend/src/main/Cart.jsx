import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useCart, useDispatchCart } from '../components/ContextReducer';
// import Modal from '../Modal';
import './Cart.scss';

const Cart = () => {

  const cart = useCart(); 
  const dispatch = useDispatchCart();

  useEffect(() => {
    console.log("Updated cart items:", cart.items); // Log the updated cart items using 'cart.items'
  }, [cart.items]);

  if(!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return (
      <div>
        <h3 className="paragraph">Your order has been placed !!! 
        <br />Please wait</h3>
      </div>
    );
  }
  const handleCheckout = async () => {
    let userEmail = localStorage.getItem('userEmail');
    
    try {
      const response = await fetch('http://localhost:5500/api/OrderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: cart,
          email:userEmail,
          order_date : new Date().toDateString()

        }),
      });
  
      if(response.status === 200) {
        dispatch({type:'DROP'})
      }

    } catch (error) {

      console.error('Error during fetch:', error);
    }
  };
  


  const totalPrice = cart.items.reduce((total, food) => total + food.price, 0);

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
          {cart.items.map((food, index) => (
            <tr key={index}>
              {/* Display item details */}
              <td>{index + 1}</td>
              <td>{food.name}</td>
              <td>{food.quantity}</td>
              <td>{food.size}</td>
              <td>${food.price}</td>
              <td>
                <button className="btn" type="button" onClick={() => dispatch({ type: 'REMOVE', index })}>
                  <FaTrash />
                </button>
       
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h1 className="heading">Total Price: {totalPrice}</h1>
      </div>
      <button className="buttonCart"onClick={handleCheckout}>Check out</button>

    
    </div>
  );
};

export default Cart;

