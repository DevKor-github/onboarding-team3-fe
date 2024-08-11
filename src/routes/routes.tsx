import { RouteObject } from 'react-router-dom';

/* Pages */
import Login from '../pages/LoginPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
  },
];

export default routes;
