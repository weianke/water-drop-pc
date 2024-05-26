import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/utils/apollo';
import '@/index.css';
import { ROUTE_CONFIG } from './routes';
import UserInfo from '@/components/UserInfo';
import Layout from '@/components/Layout';
import Login from '@/containers/Login';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <UserInfo>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Layout />}>
            {ROUTE_CONFIG.map(item => (
              <Route path={item.path} key={item.key} element={<item.element />} />
            ))}
          </Route>
        </Routes>
      </UserInfo>
    </BrowserRouter>
  </ApolloProvider>
);
