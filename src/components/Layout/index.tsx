import { useGoTo } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_KEY, routes } from '@/routes/menus';
import { AUTH_TOKEN } from '@/utils/constants';
import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { Space, Tooltip } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path || '/'}>{dom}</Link>
);
/**
 * 外层框架
 */
const Layout = () => {
  const outlet = useOutlet();
  const { store } = useUserContext();
  const nav = useNavigate();
  const { go } = useGoTo();

  const logoutHandler = () => {
    localStorage.setItem(AUTH_TOKEN, '');
    sessionStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };

  return (
    <ProLayout
      layout="mix"
      siderWidth={130}
      avatarProps={{
        src: store.avatar || 'global/logo.svg',
        title: store.name,
        size: 'small',
        onClick: () => go(ROUTE_KEY.MY)
      }}
      links={[
        <Space size={20} onClick={logoutHandler}>
          <LogoutOutlined />
          退出
        </Space>
      ]}
      title={false}
      logo={
        <img
          src="http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png"
          alt="logo"
        />
      }
      onMenuHeaderClick={() => nav('/')}
      route={{
        path: '/',
        routes: routes
      }}
      menuItemRender={menuItemRender}
    >
      {outlet}
    </ProLayout>
  );
};

export default Layout;
