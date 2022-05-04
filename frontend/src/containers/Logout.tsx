import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/context";

export default function Logout() {
  const { userHasAuthenticated } = useAppContext();
  const navigate = useNavigate();

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    // navigate("/login");
  }
  useEffect(() => {
    handleLogout();
  }, []);
  return <div>Signing off ...</div>;
}
