import { HomeOutlined } from '@ant-design/icons';
import Home from '../containers/Home';
import Page404 from '@/containers/Page404';

export const ROUTE_CONFIG = [
  {
    key: 'home',
    path: '/home',
    element: Home,
    name: '首页',
    icon: <HomeOutlined />
  },
  {
    key: '*',
    path: '*',
    element: Page404,
    name: '404',
    hideInMenu: true
  }
];
