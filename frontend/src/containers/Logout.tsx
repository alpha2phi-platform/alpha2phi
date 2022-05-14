import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCognito } from "@serverless-stack/web";
import { useAppContext } from "../libs/context";

export default function Logout() {
  const { userHasAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const cognito = useCognito();

  async function handleLogout() {
    cognito.user?.signOut();
    userHasAuthenticated(false);
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>Signing off ...</div>;
}
