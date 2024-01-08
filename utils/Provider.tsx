"use client";

import { AppStoreProvider } from "@/lib/store/Provider";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryclient] = useState(() => new QueryClient());
  return (
    <AppStoreProvider>
      <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
    </AppStoreProvider>
  );
}
