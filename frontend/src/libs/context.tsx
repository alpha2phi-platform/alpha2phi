import { useContext, createContext } from "react";
import { CognitoUserSession } from "amazon-cognito-identity-js";

export type UserContextType = {
  isAuthenticated: boolean;
  userHasAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  userSession?: CognitoUserSession | null;
  setUserSession?: React.Dispatch<React.SetStateAction<CognitoUserSession | null>>;
};

const userContext: UserContextType = {
  isAuthenticated: false,
};

export const AppContext = createContext<UserContextType | null>(userContext);

export function useAppContext() {
  return useContext(AppContext);
}
