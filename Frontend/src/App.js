import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './main/Home'; 
import Login from './main/Login';
import AboutUs from './main/AboutUs';
import SignUp from './main/SignUp';
import  { CartProvider } from './components/ContextReducer'
import MyOrder from './main/MyOrder';

const App = () => {
  return (
<CartProvider>

    <Router>
      <div className="app">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<SignUp/>} />
           <Route path="/myOrder" element={<MyOrder/>} /> 
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
};

export default App;
