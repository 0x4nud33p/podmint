
import React from "react";
import AppHeader from "../AppHeader";
import BottomNav from "../BottomNav";
import Sidebar from "./Sidebar";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col ml-4">
      <AppHeader />
      <div className="flex flex-1">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 pb-16 md:pb-0">
          <div className="container py-6">{children}</div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
