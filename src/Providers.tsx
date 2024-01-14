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
      <AuthProvider>
        <AgentProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
          </QueryClientProvider>
        </AgentProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}
