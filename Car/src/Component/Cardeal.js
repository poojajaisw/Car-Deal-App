import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DealComponent() {
  const [deals, setDeals] = useState([]);
  const [formData, setFormData] = useState({
    car_id: '',
    deal_info: {}
  });

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await axios.get('/cardeal/allcar');
      setDeals(response.data);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/cardeal', formData);
      console.log('Deal created:', response.data);
      fetchDeals(); // Refresh the list of deals after creating a new deal
    } catch (error) {
      console.error('Error creating deal:', error);
    }
  };

  return (
    <div>
      <h2>Deals</h2>
      <form onSubmit={handleSubmit}>
        <label>Car ID:</label>
        <input type="text" name="car_id" value={formData.car_id} onChange={handleChange} required />
        {/* Additional fields for deal_info can be added here */}
        <button type="submit">Create Deal</button>
      </form>

      <h3>All Deals:</h3>
      <ul>
        {deals.map((deal, index) => (
          <li key={index}>
            Deal ID: {deal.deal_id}<br />
            Car ID: {deal.car_id}<br />
            Deal Info: {JSON.stringify(deal.deal_info)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DealComponent;
