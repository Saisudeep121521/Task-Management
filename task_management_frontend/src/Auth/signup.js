import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignForm = () => {
  const [credentials, setCredentials] = useState({
    fullname: '', 
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/login/', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setCredentials({
        fullname: '', 
        email: '',
        username: '',
        password: '',
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding task:', error);
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
                id="floatingInputFn"
                placeholder="Full Name"
                name="fullname"  
                value={credentials.fullname}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingInputFn">Full Name</label>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInputEmail"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingInputEmail">Email</label>
            </div>
          </div>

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
                SignUp
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignForm;
