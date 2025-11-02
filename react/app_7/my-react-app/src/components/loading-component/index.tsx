
//@ts-nocheck
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";

export function LoadingComponent({ children, isLoading }: { children: JSX.Element, isLoading: boolean }) {
    if (isLoading) return <CircularProgress />
    else return children
}