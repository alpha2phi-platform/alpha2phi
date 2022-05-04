import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIconIcon from "@mui/icons-material/AppRegistration";
import { ListItemLink } from "../libs/formHooks";

const SubMenu = (props: { isAuthenticated: boolean }) => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        User
      </ListSubheader>
      {props.isAuthenticated ? (
        <ListItemLink
          index={10}
          to="/logout"
          primary="Logout"
          icon={<LogoutIcon />}
        />
      ) : (
        <>
          <ListItemLink
            index={11}
            to="/login"
            primary="Login"
            icon={<LoginIcon />}
          />
          <ListItemLink
            index={12}
            to="/signup"
            primary="Sign up"
            icon={<AppRegistrationIconIcon />}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default SubMenu;
