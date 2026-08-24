"use client";

import { createContext, useContext } from "react";

const AdminContext = createContext<boolean>(false);

export function AdminProvider({
  isAdmin,
  children,
}: {
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  return (
    <AdminContext.Provider value={isAdmin}>{children}</AdminContext.Provider>
  );
}

export function useIsAdmin() {
  return useContext(AdminContext);
}
