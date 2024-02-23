import React, { useState } from 'react';
import axios from 'axios';

function DealershipForm() {
  const [formData, setFormData] = useState({
    dealership_email: '',
    password: '',
    dealership_name: '',
    dealership_location: '',
    dealership_info: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/dealerData', formData);
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
      const response = await axios.post('/dealerlogin', formData);
      console.log(response.data);
      // Handle success, maybe store the token in local storage and redirect
    } catch (error) {
      console.error(error);
      // Handle error, show an error message or alert
    }
  };

  return (
    <div>
      <h2>Dealership Signup</h2>
      <form onSubmit={handleSignupSubmit}>
        <input type="email" name="dealership_email" placeholder="Email" value={formData.dealership_email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="dealership_name" placeholder="Dealership Name" value={formData.dealership_name} onChange={handleChange} />
        <input type="text" name="dealership_location" placeholder="Dealership Location" value={formData.dealership_location} onChange={handleChange} />
        {/* Additional fields for dealership_info can be added here */}
        <button type="submit">Signup</button>
      </form>

      <h2>Dealership Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type="email" name="dealership_email" placeholder="Email" value={formData.dealership_email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default DealershipForm;
