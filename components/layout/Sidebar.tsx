"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Headphones, Home, Mic, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {ThemeToggle} from "../ThemeToggle";

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [active, setActive] = React.useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
    { id: "record", label: "Record New", icon: Mic, path: "/record" },
    { id: "library", label: "My Library", icon: Headphones, path: "/library" },
    { id: "schedule", label: "Schedule", icon: Calendar, path: "/schedule" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={cn(
        "w-64 border-r bg-background p-4 flex flex-col h-[calc(100vh-64px)]",
        className
      )}
    >
      <div className="space-y-4 flex-1">
        <div className="py-2">
          <h2 className="text-lg font-semibold tracking-tight mb-3">Menu</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setActive(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all mb-2",
                  active === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
