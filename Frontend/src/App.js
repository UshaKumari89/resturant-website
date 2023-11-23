import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './main/Home'; 
import Login from './main/Login';
import AboutUs from './main/AboutUs';
import SignUp from './main/SignUp';

const App = () => {
  return (
    <Router>
      <div className="app">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
