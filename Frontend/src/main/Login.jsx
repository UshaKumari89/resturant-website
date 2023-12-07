import { useState, }from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import avatarImage from '../images/avtar.jpg';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5500/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Authentication failed. Invalid credentials.');
      }

      const json = await response.json();
      if (!json.success) {
        alert('Enter valid credentials');
      } else {
        setTimeout(() => {
          setIsLoggedIn(true);
          setCredentials({
            email: '',
            password: '',
          });
          localStorage.setItem('userEmail', credentials.email)
          localStorage.setItem('autToken', json.authToken);
          console.log('Stored autToken:', localStorage.getItem('autToken'));
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      alert('Error occurred. Please check console for details.');
      console.error('Login Error:', error.message);
    }
  }

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('autToken');
    navigate('/login');
  };
  return (
    <div className="container">
      <div className="signupCard">
        <div className="signupCard_title">
          <h1>Log In</h1>
          <img src={avatarImage} alt="loginimage" className="image" />
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
            />
            <button type="submit">Log In</button>
          </form>
        </div>
        {isLoggedIn ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/myorders">My Orders</Link>
       
          </div>
        ) : null}
      </div>
    </div>
  );
}
 export default Login;
