import { ReactNode, createContext, useState } from "react";

type AuthContext = {
  token?: string;
  setToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContext>({
  setToken: (_) => {},
});

AuthContext.displayName = 'AuthContext';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | undefined>(localStorage.getItem('sr_token') ?? undefined);

  function updateToken(token: string | undefined) {
    if (!token) {
        localStorage.removeItem('sr_token');
        setToken(token);
        return
    }

    localStorage.setItem('sr_token', token);
    setToken(token)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: updateToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
