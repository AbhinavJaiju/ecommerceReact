import logo from "./logo.svg";
import "./App.css";
import Login from "./components/auth/Login";
import Profile1 from "./pages/profile/Profile1";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/pages/Home" element={<Home />} exact />
          <Route path="/pages/ProductList" element={<ProductList />} exact />
          <Route
            path="/pages/singleProduct/SingleProduct"
            element={<SingleProduct />}
            exact
          />
          <Route path="/pages/register/Register" element={<Register />} exact />
          {/* <Route path='/pages/profile/Profile1' element={<Profile1/>} exact /> */}
          {/* <ProtectedRoute /> */}
          <Route path="/pages/profile/Profile1" element={<ProtectedRoute />}>
            <Route exact path="/pages/profile/Profile1" element={<Profile1 />} />
          </Route>
          <Route path="/pages/cart/Cart" element={<ProtectedRoute />}>
            <Route exact path="/pages/cart/Cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
