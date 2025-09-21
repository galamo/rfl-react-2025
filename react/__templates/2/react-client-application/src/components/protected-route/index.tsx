import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import axios from "axios";
import { MainLoader } from "../routing";
export default function ProtectedRoute() {
  const isTokenExist = lsHelper();
  console.log(window.location.href);
  localStorage.setItem("lastVisitedPage", window.location.pathname);
  return isTokenExist ? <Outlet /> : <Navigate to="/auth/login" />;
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
        await axios.get("http://localhost:2200/api/secure", {
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
    <MainLoader />
  ) : isTokenValid ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
}
