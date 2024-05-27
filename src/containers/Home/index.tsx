import { Button } from 'antd';
import style from './index.module.less';
import { useUserContext } from '@/hooks/userHooks';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';

/**
 * 首页
 */
const Home = () => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  return (
    <div className={style.container}>
      首页 用户 name: {store.name}
      用户 tel:{store.tel}
      <Button onClick={() => go(ROUTE_KEY.MY)}>去个人中心</Button>
    </div>
  );
};

export default Home;
