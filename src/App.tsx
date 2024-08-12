import './App.css'
import React from 'react';
import { Route, Routes, BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import routes from './routes/routes';

const App: React.FC = () => {
  const routing = useRoutes(routes); // This will use your routes configuration

  return <div>{routing}</div>; // Renders the routes

  // return (
  //   // <Router>
  //   //   <Routes>
  //   //     <Route path="/" element={<Login />} />
  //   //     <Route path="/RegisterPage" element={<Register />} /> {/* Ensure this route matches the Link */}
         
  //   //   </Routes>
  //   // </Router>
  //  );
};

export default App;
