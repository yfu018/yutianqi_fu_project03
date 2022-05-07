import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import CarResult from './component/CarResult.jsx'
import LogInSignUp from './component/LogInSignUp.jsx';
import CreateCar from './component/CreateCar.jsx';
import CarDetail from './component/CarDetail';
import EditReview from './component/EditReview.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/home" element={<CarResult />} />
      <Route path="/LogInSignUp" element={<LogInSignUp />} />
      <Route path="/createCar" element={<CreateCar />} />
      <Route path="/carDetail/:carId" element={<CarDetail/>} />
      <Route path="/edit/:reviewId" element={<EditReview />}/>
      <Route path="/" element={<Navigate replace to="/home" />} />
    </Routes> 
  </Router>
  ,
  document.getElementById('root')
);
