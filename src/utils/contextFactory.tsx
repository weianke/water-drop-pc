/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useContext, useMemo, useState } from "react";
import { IPropChild } from "./types";

// 定义存储接口，用于管理状态
interface IStore<T> {
  key: string; // 存储的唯一标识键
  store: T; // 存储的实际数据
  setStore: (payload: Partial<T>) => void; // 更新存储数据的方法
}

/**
 * 创建Context Provider的工厂函数
 * @param key - Context的唯一标识
 * @param defaultValue - Context的默认值
 * @param AppContext - React Context实例
 * @returns Provider组件
 */
function getCxtProvider<T>(
  key: string,
  defaultValue: T,
  AppContext: React.Context<IStore<T>>
) {
  return ({ children }: IPropChild) => {
    // 使用useState管理状态
    const [store, setStore] = useState(defaultValue);

    // 使用useMemo优化性能，只有当store变化时才重新创建value对象
    const value = useMemo(
      () => ({
        key,
        store,
        setStore: (payload = {}) =>
          setStore((state) => ({
            ...state,
            ...payload,
          })),
      }),
      [store]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  };
}

// 用于缓存已创建的Context实例
const cxtCache: Record<string, Cxt> = {};

/**
 * Context类，用于创建和管理Context实例
 */
class Cxt<T = any> {
  defaultStore: IStore<T>; // 默认存储对象
  AppContext: React.Context<IStore<T>>; // React Context实例
  Provider: ({ children }: IPropChild) => JSX.Element; // Provider组件

  constructor(key: string, defaultValue: T) {
    // 初始化默认存储
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {},
    };
    // 创建Context实例
    this.AppContext = createContext(this.defaultStore);
    // 创建Provider组件
    this.Provider = getCxtProvider(key, defaultValue, this.AppContext);
    // 将实例缓存
    cxtCache[key] = this;
  }
}

/**
 * 自定义Hook，用于在组件中使用Context
 * @param key - Context的唯一标识
 * @returns 包含store和setStore的对象
 */
export function useAppContext<T>(key: string) {
  const cxt = cxtCache[key] as Cxt<T>;
  const app = useContext(cxt.AppContext);
  return {
    store: app.store,
    setStore: app.setStore,
  };
}

/**
 * 高阶组件工厂函数，用于连接组件与Context
 * @param key - Context的唯一标识
 * @param defaultValue - Context的默认值
 * @returns 返回一个高阶组件
 */
export function connectFactory<T>(key: string, defaultValue: T) {
  // 检查是否已存在相同key的Context
  const cxt = cxtCache[key];
  let CurCxt: Cxt<T>;
  if (cxt) {
    CurCxt = cxt;
  } else {
    // 不存在则创建新的Context实例
    CurCxt = new Cxt<T>(key, defaultValue);
  }

  // 返回高阶组件，将Context Provider注入到组件树中
  return (Child: React.FunctionComponent<any>) => (props: any) => (
    <CurCxt.Provider>
      <Child {...props} />
    </CurCxt.Provider>
  );
}
