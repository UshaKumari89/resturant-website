import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.scss";
import "./Login";
import avatarImage from '../images/avtar.jpg';

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const json = await response.json();
      console.log('Response from server:', json);

      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        // If user creation successful, perform automatic login
        const loginResponse = await fetch("http://localhost:5500/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials), // Use signup credentials for login
        });

        if (!loginResponse.ok) {
          throw new Error("Login failed after signup.");
        }

        const loginJson = await loginResponse.json();
        console.log('Login response:', loginJson);

        if (loginJson.success && loginJson.authToken) {
          localStorage.setItem('authToken', loginJson.authToken);
          navigate('/login'); 
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Please check console for details.");
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="container">
      <div className="signupCard">
        <div className="signupCard_title">
          <h1>Sign Up Here</h1>
           <img src={avatarImage} alt="loginImage" className="image"/>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={credentials.name}
              onChange={onChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              value={credentials.email}
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              value={credentials.password}
              onChange={onChange}
            />
            <input
              type="text"
              name="number"
              placeholder="Phone Number"
              id="number"
              value={credentials.number}
              onChange={onChange}
            />
   
           <button type = "submit">Sign Up</button>
          
           <button ><a href="/login">Log In</a></button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
