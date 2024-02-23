import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm'; 
import Dealer from './Dealer'
import Cardeal from './Component/Cardeal'
import Carview from './Component/Carview'
//import Cardeal from './Component/Cardeal'
import SoldCar from './Component/SoldCar'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          
          <Route path="/user" element={<UserForm />} />
          <Route path="/dealer" element={<Dealer/>} />
          <Route path="/cardeal" element={<Cardeal/>} />
          <Route path="/car" element={<Carview/>} />
          <Route path="/carsold" element={<SoldCar/>} />
          
        </Routes>
      </Router>
    </>
  );
};

export default App;
