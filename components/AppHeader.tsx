"use client";

import React from "react";
import { Bell, Calendar, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {ThemeToggle} from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

const AppHeader: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="font-semibold text-lg">P</span>
          </div>
          <span className="font-semibold text-lg hidden md:block">Podmint</span>
        </div>
        
        <div className="flex items-center gap-4">
          {!isMobile && (
            <>
              <Button variant="ghost" size="icon" aria-label="Calendar">
                <Calendar className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle />
            </>
          )}
          
          <Button variant="ghost" size="icon" aria-label="Settings" className="hover:cursor-pointer">
            <Settings className="h-5 w-5" />
          </Button>
          
          <Avatar className="h-8 w-8 hover:cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
