import { useContext, createContext } from "react";

export type UserContextType = {
  isAuthenticated: boolean;
  userHasAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
};

const userContext: UserContextType = {
  isAuthenticated: false,
};

export const AppContext = createContext<UserContextType | null>(userContext);

export function useAppContext() {
  return useContext(AppContext);
}
