import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/utils/apollo';
import '@/index.css';
import { routes } from '@/routes/menus';
import UserInfo from '@/components/UserInfo';
import Layout from '@/components/Layout';
import Login from '@/containers/Login';
import { ROUTE_COMPONENT } from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <UserInfo>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Layout />}>
            {routes.map(item => {
              const Component = ROUTE_COMPONENT[item.key];
              return <Route path={item.path} key={item.key} element={<Component />} />;
            })}
          </Route>
        </Routes>
      </UserInfo>
    </BrowserRouter>
  </ApolloProvider>
);
