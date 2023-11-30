import React, { createContext, useContext, useReducer } from 'react'


const cartStateContext = createContext()
const cartDispatchContext = createContext()

const initialState = {
    items: [],
    // other cart-related properties
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return {
          ...state,
          items: [
            ...state.items,
            {
              id: action.id,
              name: action.name,
              quantity: action.quantity,
              size: action.size,
              price: action.price,
              img: action.img,
            },
          ],
        };
      // Other cases for different actions
  
      default:
        console.log('Error in reducer');
        return state; // Ensure you return the state for unhandled actions
    }
  };
  
export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
return(
<cartDispatchContext.Provider value = {dispatch}>
  <cartStateContext.Provider value = {state}>
{children}

  </cartStateContext.Provider>
</cartDispatchContext.Provider>
)

}

export const useCart = () => useContext(cartStateContext);

export  const useDispactchCart  = () =>useContext(cartDispatchContext)
