"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const GoogleLogin = ({title}:{title:string}) => {
  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    }
  };

  return (
    <div>
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        className="mt-8 mb-8 flex w-full items-center justify-center gap-3 rounded-xl border border-input bg-white py-6 text-sm font-medium text-foreground shadow-sm hover:bg-accent"
      >
        <Image
          src="/images/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="h-5 w-5"
        />
        <span>{title}</span>
      </Button>
    </div>
  );
};

export default GoogleLogin;
