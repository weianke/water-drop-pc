import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import './index.css';
import { ROUTE_CONFIG } from './routes';
import Page404 from './containers/Page404';
import UserInfo from './components/UserInfo';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <UserInfo >
    <BrowserRouter>
      <Routes>
        {ROUTE_CONFIG.map((item) => (
          <Route
            path={item.path}
            key={item.key}
            element={<item.element />}
          />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
    </UserInfo>
  </ApolloProvider>,
);
