import { useQuery } from '@apollo/client';
import { connectFactory, useAppContext } from '../utils/contextFactory';
import { GET_USER } from '@/graphql/user';
import { IUser } from '../utils/types';
import { useLocation, useNavigate } from 'react-router-dom';


const KEY = 'userInfo';
const DEFAULT_VALUE = {

};
export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
  const { setStore } = useUserContext();
  const nav = useNavigate();
  const location = useLocation();
  const { loading }= useQuery<{getUserInfo: IUser}>(GET_USER, {
    onCompleted: (data) => {
      // 如果获取到用户信息，则设置到 store 中
      if (data.getUserInfo) {
        const {id, name, tel} = data.getUserInfo;
        setStore({
          id,
          name,
          tel
        });
         // 当前在登录页面，且已经登录了，那就直接跳到首页
         if (location.pathname === '/login') {
          nav('/');
        }
        return;
      }
      // 如果不在登录页面，但是目前没有登录，那就直接跳到登录页面
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
    onError: () => {
      // 如果当前页面不是登录页面，则重定向到登录页面
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    }
  });

  return {
    loading
  }
};
