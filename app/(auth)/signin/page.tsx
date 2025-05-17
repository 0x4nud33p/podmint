"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Google from "@/svgs/Google";
import { authClient } from "@/lib/auth-client";

export default function SignUpWithGoogle() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Google sign up failed:", error);
      toast.error("Google sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className="w-full border p-3 rounded-lg flex items-center justify-center disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed"
          onClick={handleGoogleSignUp}
          disabled={loading}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin mr-2" />
          ) : (
            <Google />
          )}
          Sign In with Google
        </button>
      </motion.div>
    </div>
  );
}
