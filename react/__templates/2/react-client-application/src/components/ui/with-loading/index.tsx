import { CircularProgress } from "@mui/material";
import { ReactElement } from "react";

interface IWithLoading {
  children: ReactElement;
  isLoading: boolean;
}
export function WithLoading(props: IWithLoading): ReactElement {
  const { children, isLoading } = props;
  return isLoading ? <CircularProgress /> : children;
}
