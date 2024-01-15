import { ReactNode } from "react";
import AuthProvider from "./contexts/AuthContext";
import AgentProvider from "./contexts/AgentContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CookiesProvider defaultSetOptions={{ sameSite: "strict" }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AgentProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
          </AgentProvider>
        </AuthProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}
