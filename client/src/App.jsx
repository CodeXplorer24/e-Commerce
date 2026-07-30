// import { useState } from 'react'
import "./App.css";
import {Route, Routes, Navigate} from "react-router-dom"
import AuthLayout from "./components/auth/AuthLayout.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import AdminLayout from "./components/admin/adminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Features from "./pages/admin/Features.jsx";
import Products from "./pages/admin/Products.jsx";
import Orders from "./pages/admin/Orders.jsx";
import ShoppingLayout from "./components/shopping/ShoppingLayout.jsx"
import NotFound from "./pages/error/NotFound.jsx";
import Home from "./pages/shopping/Home.jsx";
import ProductListing from "./pages/shopping/ProductListing.jsx";
import Checkout from "./pages/shopping/Checkout.jsx";
import Account from "./pages/shopping/Account.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import UnAuthPage from "./pages/error/UnAuthPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./features/auth/authThunk.js";
// import { Skeleton } from "@/components/ui/skeleton"
import { SpinnerCustom } from "@/components/ui/spinner.jsx"
import SellerLayout from "./components/seller/SellerLayout";

function App() {
  const {user, isAuthenticated, isLoading} = useSelector((state) => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <SpinnerCustom className="text-white"/>
    </div>
  )
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      
      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
            ></ProtectedRoute>
          }
        />

        <Route
          path="/auth"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              {<AuthLayout />}
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="login" replace />}/>   {/*default path to parent route at "/auth"*/}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Login />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              {<AdminLayout />}
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="features" element={<Features />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route
          path="/shop"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              {<ShoppingLayout />}
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="product" element={<ProductListing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
        </Route>

        <Route 
          path="/seller"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              {<SellerLayout/>}
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="features" element={<Features />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
