import './App.css'
import React from 'react';
import { Route, Routes, BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/JoinPage';
import routes from './routes/routes';

const App: React.FC = () => {
  const routing = useRoutes(routes); // This will use your routes configuration

  return <div>{routing}</div>; // Renders the routes
};

export default App;
