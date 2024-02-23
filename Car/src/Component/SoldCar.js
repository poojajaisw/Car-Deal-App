import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SoldVehicleComponent() {
  const [soldVehicles, setSoldVehicles] = useState([]);
  const [formData, setFormData] = useState({
    car_id: '',
    vehicle_info: {}
  });

  useEffect(() => {
    fetchSoldVehicles();
  }, []);

  const fetchSoldVehicles = async () => {
    try {
      const response = await axios.get('/soldvehicles');
      setSoldVehicles(response.data);
    } catch (error) {
      console.error('Error fetching sold vehicles:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/soldvehicles', formData);
      console.log('Sold vehicle created:', response.data);
      fetchSoldVehicles(); // Refresh the list of sold vehicles after creating a new one
    } catch (error) {
      console.error('Error creating sold vehicle:', error);
    }
  };

  return (
    <div>
      <h2>Sold Vehicles</h2>
      <form onSubmit={handleSubmit}>
        <label>Car ID:</label>
        <input type="text" name="car_id" value={formData.car_id} onChange={handleChange} required />
        {/* Additional fields for vehicle_info can be added here */}
        <button type="submit">Create Sold Vehicle</button>
      </form>

      <h3>All Sold Vehicles:</h3>
      <ul>
        {soldVehicles.map((vehicle, index) => (
          <li key={index}>
            Car ID: {vehicle.car_id}<br />
            Vehicle Info: {JSON.stringify(vehicle.vehicle_info)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SoldVehicleComponent;
