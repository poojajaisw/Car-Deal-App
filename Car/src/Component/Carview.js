import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CarComponent() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    model: '',
    image_url: '', // Add image_url field to formData
    car_info: {}
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/cars', formData);
      console.log('Car created:', response.data);
      fetchCars(); // Refresh the list of cars after creating a new car
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div>
      <h2>Cars</h2>
      <form onSubmit={handleSubmit}>
        <label>Type:</label>
        <input type="text" name="type" value={formData.type} onChange={handleChange} required />
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label>Model:</label>
        <input type="text" name="model" value={formData.model} onChange={handleChange} required />
        <label>Image URL:</label> {/* New field for image URL */}
        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required />
        {/* Additional fields for car_info can be added here */}
        <button type="submit">Create Car</button>
      </form>

      <h3>All Cars:</h3>
      <ul>
        {cars.map((car, index) => (
          <li key={index}>
            Type: {car.type}<br />
            Name: {car.name}<br />
            Model: {car.model}<br />
            Image URL: {car.image_url}<br /> {/* Display image URL */}
            Car Info: {JSON.stringify(car.car_info)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarComponent;
