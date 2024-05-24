import { useQuery } from '@apollo/client';
import { connectFactory, useAppContext } from './contextFactory';
import { GET_USER } from '../graphql/user';
import { IUser } from './types';

const KEY = 'userInfo';
const DEFAULT_VALUE = {

};
export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
  const { setStore } = useUserContext();
  useQuery<{getUserInfo: IUser}>(GET_USER, {
    onCompleted: (data) => {
      // 如果获取到用户信息，则设置到 store 中
      if (data.getUserInfo) {
        const {id, name, tel} = data.getUserInfo;
        setStore({
          id,
          name,
          tel
        });
        return;
      }
      // 如果没有获取到用户信息，则重定向到登录页面
      window.location.href = '/login';
    },
    onError: () => {
      // 如果当前页面不是登录页面，则重定向到登录页面
      if (window.location.pathname !== '/login'){
        window.location.href = '/login';
      }
    }
  });
};
