import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [userData, setUserData] = useState({
    user_email: '',
    password: '',
    user_location: '',
    user_info: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/userdata', userData);
      console.log(response.data);
      // Handle success, maybe show a success message or redirect
    } catch (error) {
      console.error(error);
      // Handle error, show an error message or alert
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', userData);
      console.log(response.data);
      // Handle success, maybe store the token in local storage and redirect
    } catch (error) {
      console.error(error);
      // Handle error, show an error message or alert
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleUserSubmit}>
        <input type="email" name="user_email" placeholder="Email" value={userData.user_email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
        <input type="text" name="user_location" placeholder="Location" value={userData.user_location} onChange={handleChange} />
        {/* Additional fields for user_info can be added here */}
        <button type="submit">Register</button>
      </form>

      <h2>User Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type="email" name="user_email" placeholder="Email" value={userData.user_email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserForm;
