import { jwtDecode } from "jwt-decode";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import useStatus from "../hooks/useStatus";

type TokenPayload = {
  identifier: string;
  version: string;
  reset_date: string;
  iat: number;
  sub: string;
};

type AuthContext = {
  token?: string;
  setToken: (token: string) => void;
  version?: string;
  setVersion: (version: string) => void;
  resetDate?: string;
  setResetDate: (reset: string) => void;
};

export const AuthContext = createContext<AuthContext>({
  setToken: () => {},
  setVersion: () => {},
  setResetDate: () => {},
});

AuthContext.displayName = "AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { data: status } = useStatus();

  const [token, setToken] = useState<string | undefined>(
    localStorage.getItem("sr_token") ?? undefined,
  );

  const [version, setVersion] = useState<string | undefined>(() => {
    const token = localStorage.getItem("sr_token") ?? undefined;

    if (!token) return;

    return parseToken(token).version;
  });
  const [resetDate, setResetDate] = useState<string | undefined>(() => {
    const token = localStorage.getItem("sr_token") ?? undefined;

    if (!token) return;

    return parseToken(token).reset_date;
  });

  function parseToken(token: string) {
    return jwtDecode<TokenPayload>(token);
  }

  const clearToken = useCallback(() => {
    localStorage.removeItem("sr_token");
    setToken(undefined);
    setVersion(undefined);
    setResetDate(undefined);
  }, []);

  function updateToken(token: string | undefined) {
    if (!token) {
      return clearToken();
    }

    const { reset_date: resetDate, version } = parseToken(token);

    localStorage.setItem("sr_token", token);
    setToken(token);
    setResetDate(resetDate);
    setVersion(version);
  }

  useEffect(() => {
    if (!status) {
      return;
    }

    if (
      status.version !== version ||
      status.resetDate.toString() !== resetDate
    ) {
      clearToken();
    }
  }, [clearToken, status, version, resetDate]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: updateToken,
        version,
        setVersion,
        resetDate,
        setResetDate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
