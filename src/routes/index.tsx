import { Routes, Route } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Signin, Verify } from "../pages/signin";
import { Overview } from "../pages/overview";
import { Transactions } from "../pages/transactions";
import { Customers, CustomerProfile } from "../pages/customers";
import { Providers, Provider, Products } from "../pages/products";
import { Currencies } from "../pages/currencies";
import { Landing } from "../pages/landing";

import "./../App.css";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/:id" element={<CustomerProfile />} />
      <Route path="/products" element={<Providers />} />
      <Route path="/products/:id" element={<Provider />} />
      <Route path="/products/list/:id/:name" element={<Products />} />
      <Route path="/currencies" element={<Currencies />} />
    </Routes>
  );
};

export default AppRouter;
