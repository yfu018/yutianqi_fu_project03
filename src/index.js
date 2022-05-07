import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignUp from './component/LogInSignUp.jsx';
import CreateJob from './component/CreateJob.jsx';
import EditJob from './component/EditJob.jsx';
import SearchJob from './component/SearchJob.jsx';
import EntryResult from './component/EntryResult.jsx'
import JobDetail from './component/JobDetail';



ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<EntryResult />} />
      <Route path="/loginsignup" element={<LoginSignUp />} />
      <Route path="/create" element={<CreateJob />} />
      <Route path="/edit/:jobId" element={<EditJob />}/>
      <Route path="/SearchJob" element={<SearchJob />}/>
      <Route path="/jobDetail/:jobId" element={<JobDetail />} />
    </Routes> 
  </Router>
  ,
  document.getElementById('root')
);
