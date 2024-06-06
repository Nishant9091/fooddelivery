import React from 'react';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './screens/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from './screens/SignUp';
import { CartProvider } from './Components/ContextReducer';
import MyOrder from './screens/MyOrder';

const App = () => {
  return (
    <>
      <CartProvider>
        <Router>
          <Navbar />
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/createuser" element={<SignUp />} />
              <Route exact path="/myOrder" element={<MyOrder />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </>
  )
}

export default App;
