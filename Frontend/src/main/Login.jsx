import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './logIn.scss';

function Login() {
  const [credentionals, setcredentionals] = useState({
    email: "",
    password: "",
 
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentionals.email,
          password: credentionals.password,
      
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
  
      const json = await response.json();
      console.log(json);
  
      if (!json.success) {
        alert("Enter valid credentials");

      } else {
        setcredentionals({
          email: "",
          password: "",
       
        });
        localStorage.setItem('autToken', json.authToken );
        console.log(localStorage.getItem('autToken'));
        navigate("/");
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
          <h1>Log In</h1>
         
        </div>
        <div className="form">
          <form action="/register" method="post" onSubmit={handleSubmit}>

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
         
            <button>Log In</button>
            <button><a href="createuser">New User</a></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
