import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import { ListItemLink } from "../libs/formHooks";

const MainMenu = (props: { isAuthenticated: boolean }) => {
  return (
    <React.Fragment>
      <ListItemLink index={0} to="/" primary="Home" icon={<HomeIcon />} />
      {props.isAuthenticated && (
        <ListItemLink
          index={1}
          to="/dashboard"
          primary="Dashboard"
          icon={<DashboardIcon />}
        />
      )}
    </React.Fragment>
  );
};

export default MainMenu;
