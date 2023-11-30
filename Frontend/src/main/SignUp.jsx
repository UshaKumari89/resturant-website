import { React, useState } from "react";

import "./SignUp.scss";
import "./Login";
import avatarImage from '../images/avtar.jpg';

const SignUp = () => {
  const [credentionals, setcredentionals] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Data to be sent:', credentionals); // Log the data before sending
  
      const response = await fetch("http://localhost:5500/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentionals.name,
          email: credentionals.email,
          password: credentionals.password,
          number: credentionals.number,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
  
      const json = await response.json();
      console.log('Response from server:', json); // Log the response from the server
  
      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        console.log('User created successfully:', json); // Log success message or user data
        setcredentionals({
          name: "",
          email: "",
          password: "",
          number: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Please check console for details.");
    }
  };
  
  const onChange = (event) => {
    setcredentionals({
      ...credentionals,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="container">
      <div className="signupCard">
        <div className="signupCard_title">
          <h1>Sign Up Here</h1>
          {/* <span>
            Already have an account? <a href="login">Log In</a>
          </span> */}
           <img src={avatarImage} alt="loginImage" className="image"/>
        </div>
        <div className="form">
          <form action="/register" method="post" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={credentionals.name}
              onChange={onChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              value={credentionals.email}
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              value={credentionals.password}
              onChange={onChange}
            />
            <input
              type="text"
              name="number"
              placeholder="Phone Number"
              id="number"
              value={credentionals.number}
              onChange={onChange}
            />
           <button  type="submit"><a href="/login">Sign Up</a></button>
           <button ><a href="login">Log In</a></button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
