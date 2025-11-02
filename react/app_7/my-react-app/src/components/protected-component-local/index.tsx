//@ts-nocheck
import { Navigate } from "react-router-dom";

export function ProtectedComponentLocal({ children }: { children: JSX.Element }) {
    if (!localStorage.getItem("token")) return <Navigate to={"/login"} />;
    else return children
}