import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './routes/ProductsPage/Products';
import About from './routes/About/About';
import Register from './routes/Register/Register';
import Login from './routes/Login/Login';
import AddDisc from './routes/AddDisc/AddDisc';
import MyProfile from './routes/MyProfile/MyProfile';
import Cart from './routes/Cart/Cart';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import DetailedProduct from './routes/DetailedProduct/DetailedProduct';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product-detail/:id" element={<DetailedProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-profile/:id" element={<MyProfile />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-disc" element={<AddDisc />} />
      </Routes>
    </ApolloProvider>
  </BrowserRouter>
);