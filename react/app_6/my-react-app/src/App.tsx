import { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Outlet } from "react-router-dom";

import { CountriesPage } from "./components/pages/countries";
import { Route, Routes } from "react-router-dom";
import NavigationHeader from "./components/navigation-header";
import { CountryPage } from "./components/pages/country";
import RegistrationPage from "./components/pages/register";
import LoginPage from "./components/pages/login";
import CountriesReportsPage from "./components/pages/reports";
import UseLayoutEffectVsUseEffect from "./components/pages/useLayoutEffect";
import UseRefRender from "./components/pages/useRefImpactRender";
import Home from "./components/pages/home";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Expenses } from "./components/pages/expenses-category";
import ExpensesPage from "./components/pages/expenses";

function ProtectedRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
function lsHelper() {
  return localStorage.getItem("token");
}
export function AsyncProtectedRoute() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function auth() {
      try {
        if (!lsHelper()) {
          setIsLoading(false);
          setIsTokenValid(false);
          return;
        }
        await axios.get("http://localhost:3000/auth/token-valid", {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        setIsTokenValid(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsTokenValid(false);
      }
    }
    auth();
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : isTokenValid ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}




export default function App() {
  const [show, setShow] = useState(true);
  return (
    <>
      <div>
        <NavigationHeader />
        <div style={{ marginTop: "20px" }}>
        </div>
        <main className="p-6">
          <Routes>
            <Route element={<AsyncProtectedRoute />}>
              <Route path="/countries" element={<CountriesPage />} />
              <Route path="/country/:countryId" element={<CountryPage />} />
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reports" element={<CountriesReportsPage />} />
            <Route
              path="/useLayoutEffect"
              element={<UseLayoutEffectVsUseEffect />}
            />
            <Route path="/UseRefRender" element={<UseRefRender />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </>
  );
}
