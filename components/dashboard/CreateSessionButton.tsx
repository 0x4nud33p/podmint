
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CreateSessionButton: React.FC = () => {
  return (
    <Link href="/record">
      <Button className="w-full md:w-auto flex gap-2 items-center">
        <Plus className="h-4 w-4" />
        New Recording
      </Button>
    </Link>
  );
};

export default CreateSessionButton;
