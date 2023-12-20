"use client";
import { QueryClient, QueryClientProvider } from "react-query";

function QueryProvider({ children }: { children: React.ReactNode }) {
  const query = new QueryClient();
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}

export default QueryProvider;
