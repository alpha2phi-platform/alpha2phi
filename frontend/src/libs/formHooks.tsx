import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export function useFormFields(initialState: any) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event: React.FormEvent<HTMLInputElement>) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
}

export interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  index: number;
  selectedIndex: number;
  onClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idx: number
  ) => void;
}

export function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to, index, selectedIndex, onClick } = props;

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
      <ListItemButton
        component={renderLink}
        selected={selectedIndex === index}
        onClick={(event) => onClick(event, index)}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItemButton>
    </li>
  );
}
