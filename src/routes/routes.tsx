import { RouteObject } from 'react-router-dom';

/* Pages */
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';

const routes: RouteObject[] = [
    {
    path: '/',
    children: [
      { path: '/', element: <Login /> },
      { path: '/register', element: <Register /> },
    ]}
];

export default routes;
