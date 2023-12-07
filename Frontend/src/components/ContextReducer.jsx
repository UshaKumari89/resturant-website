import React, { createContext, useContext, useReducer } from 'react'


const cartStateContext = createContext()
const cartDispatchContext = createContext()

const initialState = {
    items: [],
   
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

        case 'UPDATE':
          const updatedItems = state.items.map((item) => {
            if (item.id === action.id) {
              const updatedQuantity = action.quantity;
              const pricePerItem = item.price / item.quantity; 
              const updatedPrice = updatedQuantity * pricePerItem; 
              return {
                ...item,
                quantity: updatedQuantity,
                price: updatedPrice, 
              };
            }
            return item;
          });
          return {
            ...state,
            items: updatedItems,
          };
          case "DROP":
            let empArray = []
            return empArray;
      case 'REMOVE':
        const filteredItems = state.items.filter((item, index) => index !== action.index);
        return {
          ...state,
          items: filteredItems,
        };
      default:
        console.log('Error in reducer');
        return state;
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

export const useDispatchCart  = () =>useContext(cartDispatchContext)
