"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/signin"); 
      }
    }, [user, isLoading, router]);

  const handleSaveAccount = () => {
    toast({
      title: "Account settings updated",
      description: "Your account settings have been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and account settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and how others see you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                  {/* <Button variant="outline" size="sm">
                    Change Avatar
                  </Button> */}
                </div>

                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Full name</Label>
                      <Input id="first-name" defaultValue={user?.name} readOnly/>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display name</Label>
                    <Input id="display-name" defaultValue={user?.name!.split(" ")[0]} readOnly />
                    <p className="text-xs text-muted-foreground">
                      This is how your name will appear to other users in the
                      app.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="h-auto p-0">
                    Reset Password
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value="••••••••"
                  disabled
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveAccount}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
