import './App.css'
import React from 'react';
import { Route, Routes, BrowserRouter as Router, useRoutes } from 'react-router-dom';

import routes from './routes/routes';

const App: React.FC = () => {
  const routing = useRoutes(routes); // This will use your routes configuration

  return <div>{routing}</div>; // Renders the routes
};

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

export default App;

