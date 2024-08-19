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
      { path: '/chat', element: <ChatList /> },
      { path: '/chat/:chatId', element: <ChatWindowPage /> },
    ]}
];

export default routes;
