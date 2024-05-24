import style from './index.module.less';
import { useUserContext } from '@/hooks/userHooks';

/**
 * 首页
 */
const Home = () => {
  const { store } = useUserContext();

  return (
    <div className={style.container}>
      首页 用户 name: {store.name}
      用户 tel:{store.tel}
    </div>
  );
};

export default Home;
