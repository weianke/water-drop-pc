import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_CONFIG } from '@/routes';
import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components';
import { Link, useOutlet } from 'react-router-dom';

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path || '/'}>{dom}</Link>
);
/**
 * 外层框架
 */
const Layout = () => {
  const outlet = useOutlet();
  const { store } = useUserContext();
  return (
    <ProLayout
      layout="mix"
      siderWidth={130}
      avatarProps={{ src: 'global/logo.svg', title: store.tel, size: 'small' }}
      title={false}
      logo={
        <img
          src="http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png"
          alt="logo"
        />
      }
      route={{
        path: '/',
        routes: ROUTE_CONFIG
      }}
      menuItemRender={menuItemRender}
    >
      <PageContainer>{outlet}</PageContainer>
    </ProLayout>
  );
};

export default Layout;
