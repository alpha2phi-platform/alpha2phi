import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIconIcon from "@mui/icons-material/AppRegistration";
import { ListItemLink } from "../libs/formHooks";

const SideMenu = (props: { isAuthenticated: boolean }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <React.Fragment>
      <ListItemLink
        index={0}
        to="/"
        primary="Home"
        icon={<HomeIcon />}
        selectedIndex={selectedIndex}
        onClick={(event) => handleListItemClick(event, 0)}
      />
      {props.isAuthenticated && (
        <ListItemLink
          index={1}
          to="/dashboard"
          primary="Dashboard"
          selectedIndex={selectedIndex}
          onClick={(event) => handleListItemClick(event, 1)}
          icon={<DashboardIcon />}
        />
      )}
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div" inset>
        User
      </ListSubheader>
      {props.isAuthenticated ? (
        <ListItemLink
          index={10}
          to="/logout"
          primary="Logout"
          selectedIndex={selectedIndex}
          onClick={(event) => handleListItemClick(event, 10)}
          icon={<LogoutIcon />}
        />
      ) : (
        <>
          <ListItemLink
            index={11}
            to="/login"
            primary="Login"
            selectedIndex={selectedIndex}
            onClick={(event) => handleListItemClick(event, 11)}
            icon={<LoginIcon />}
          />
          <ListItemLink
            index={12}
            to="/signup"
            primary="Sign up"
            selectedIndex={selectedIndex}
            onClick={(event) => handleListItemClick(event, 12)}
            icon={<AppRegistrationIconIcon />}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default SideMenu;
