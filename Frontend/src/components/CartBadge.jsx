
import React from 'react';
import './CartBadge.scss';

const CartBadge = ({ count }) => {
  return (
    <span className="cart-badge">
      {!!count && <span>{count}</span>}
    </span>
  );
};

export default CartBadge;
