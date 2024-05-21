import Home from '../containers/Home';
import Login from '../containers/Login';

export const ROUTE_CONFIG = [
  {
    key: 'home',
    path: '/',
    element: Home,
    title: '登录',
  },
  {
    key: 'login',
    path: '/login',
    element: Login,
    title: '登录',
  },
];