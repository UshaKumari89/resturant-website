import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './main/Home'; 
import Login from './main/Login';
import AboutUs from './main/AboutUs';

const App = () => {
  return (
    <Router>
      <div className="app">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
