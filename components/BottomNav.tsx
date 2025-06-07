"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, Mic, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { id: "dashboard", label: "Home", icon: Home, path: "/" },
    { id: "record", label: "Record", icon: Mic, path: "/record" },
    { id: "schedule", label: "Schedule", icon: Calendar, path: "/schedule" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.id}
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
