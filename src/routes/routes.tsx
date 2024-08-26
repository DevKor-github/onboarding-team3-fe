import { RouteObject } from 'react-router-dom';

/* Pages */
import Login from '../pages/LoginPage';
import Join from '../pages/JoinPage';
import ChatList from '../pages/ChatListPage';
import ChatWindowPage from '../pages/ChatWindowPage';

const routes: RouteObject[] = [
    {
    path: '/',
    children: [
      { path: '/', element: <Login /> },
      { path: '/join', element: <Join /> },
      { path: '/chat/list', element: <ChatList /> },
      { path: '/chat/room/:roomNumber', element: <ChatWindowPage /> },
    ]}
];

export default routes;
