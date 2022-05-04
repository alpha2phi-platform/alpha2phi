import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIconIcon from "@mui/icons-material/AppRegistration";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
        function Link(itemProps, ref) {
          return (
            <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
          );
        }
      ),
    [to]
  );

  return (
    <li>
      <ListItemButton component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItemButton>
    </li>
  );
}

export const mainMenuItems = (isAuthenticated: boolean) => {
  return (
    <React.Fragment>
      <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
      {isAuthenticated && (
        <ListItemLink
          to="/dashboard"
          primary="Dashboard"
          icon={<DashboardIcon />}
        />
      )}
    </React.Fragment>
  );
};

export const subMenuItems = (isAuthenticated: boolean) => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        User
      </ListSubheader>
      {isAuthenticated ? (
        <ListItemLink to="/logout" primary="Logout" icon={<LogoutIcon />} />
      ) : (
        <>
          <ListItemLink to="/login" primary="Login" icon={<LoginIcon />} />
          <ListItemLink
            to="/signup"
            primary="Sign up"
            icon={<AppRegistrationIconIcon />}
          />
        </>
      )}
    </React.Fragment>
  );
};

export const SubMenuItems = (props: {
  isAuthenticated: boolean;
  handleLogout: () => void;
}) => {
  const { isAuthenticated, handleLogout } = props;
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        User
      </ListSubheader>
      {isAuthenticated ? (
        <ListItemLink
          onClick={handleLogout}
          primary="Logout"
          icon={<LogoutIcon />}
        />
      ) : (
        <>
          <ListItemLink to="/login" primary="Login" icon={<LoginIcon />} />
          <ListItemLink
            to="/signup"
            primary="Sign up"
            icon={<AppRegistrationIconIcon />}
          />
        </>
      )}
    </React.Fragment>
  );
};
