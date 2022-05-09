import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Login from './components/auth/Login';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import SingleProduct from './pages/singleProduct/SingleProduct';
import Register from './pages/register/Register';
import Cart from './pages/cart/Cart'
import Profile1 from './pages/profile/Profile1';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />}/>
        <Route path="/components/auth/Login" element={<Login />} exact />
        <Route path="/pages/Home" element={<Home />} exact />
        <Route path='/pages/ProductList' element={<ProductList/>} exact/>
        <Route path='/pages/singleProduct/SingleProduct' element={<SingleProduct/>} exact/>
        <Route path='/pages/register/Register' element={<Register/>} exact />
        <Route path='/pages/cart/Cart' element={<Cart/>} exact />
        <Route path='/pages/profile/Profile1' element={<Profile1/>} exact />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
