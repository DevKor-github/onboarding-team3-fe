// src/App.tsx
import React from 'react';
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
import routes from './routes/routes';

const App: React.FC = () => {
  const routing = useRoutes(routes);

  return (
    <Router>
      {routing}
    </Router>
  );
};

export default App;
