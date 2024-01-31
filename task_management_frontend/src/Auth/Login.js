import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginForm = ({ onAddLogin }) => {
  const [data, setData] = useState([]);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });



  useEffect(() => {
    fetchData();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
    // try {
    //   await axios.post('http://localhost:8000/login/', credentials, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   setCredentials({
    //     username: '',
    //     password: '',
    //   });
    // } catch (error) {
    //   console.error('Error adding Login:', error);
    // }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const foundUser = data.find((user) => (
        user.username === credentials.username && user.password === credentials.password
      ));
  
      if (foundUser) {
        console.log('Credentials are correct');
        Cookies.set('Admin', credentials.username);
      
      } else {
        console.log('Credentials are incorrect');
      }
  
      window.location.reload();
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/login/', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const jsonData = response.data;
      console.log('Received data:', jsonData);

      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mt-5">
          <div className="col-md-6 mb-3">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInputUsername"
                placeholder="Username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingInputUsername">Username</label>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingInputPassword"
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingInputPassword">Password</label>
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <div className="form-floating mb-3">
            <button type="submit" className="btn btn-primary">
                Login
              </button>
              
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
