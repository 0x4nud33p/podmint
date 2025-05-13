"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Home, Mic, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav: React.FC = () => {
  const [active, setActive] = React.useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Home", icon: Home, path: "/" },
    { id: "record", label: "Record", icon: Mic, path: "/record" },
    { id: "schedule", label: "Schedule", icon: Calendar, path: "/schedule" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={cn(
              "flex flex-col items-center justify-center gap-1",
              active === item.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActive(item.id)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
