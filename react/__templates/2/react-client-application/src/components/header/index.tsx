import { NavLink } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import css from "./style.module.css";
import { useAppSelector } from "../../store/hooks";
import { shallowEqual } from "react-redux";

export default function HeaderNavigation() {
  // const favorites = useAppSelector((state) => state.countries.favorites)

  // DONT DO THIS
  // const { favorites } = useAppSelector((state) => {
  //   return { favorites: state.countries.favorites }
  // })
  // const { favorites } = useAppSelector((state) => state.countries)
  // INSTEAD DO THIS:
  // const favorites = useAppSelector((state) => state.countries.favorites)
  // OR THIS:
  const { favorites } = useAppSelector((state) => {
    return { favorites: state.countries.favorites }
  }, shallowEqual)

  return (
    <Box sx={{ flexGrow: 1 }} className={css.marginNavs}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit">
            <NavLink to={"/home"}> Home </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to={"/auth/login"}> Login </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to={"/auth/register"}> Register </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to={"/countries"}> countries </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to={"/countries-reports"}> reports </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to={"/settings"}> Settings </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to={"/favorites"}> Favorites ({favorites.length}) </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
