"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { Icons } from "./Icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIslading] = useState<boolean>(false);
  const { toast } = useToast();
  const loginWithGoogle = async () => {
    setIslading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIslading(false);
    }
  };
  const loginWithGithub = async () => {
    setIslading(true);
    try {
      await signIn("github");
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIslading(false);
    }
  };
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Button
        isLoading={isLoading}
        type="button"
        size="sm"
        className="w-full mb-3"
        onClick={loginWithGoogle}
      >
        {isLoading ? null : (
          <>
            <Icons.google className="h-4 w-4 mr-2" /> Google
          </>
        )}
      </Button>

      <Button
        type="button"
        size="sm"
        className="w-full"
        isLoading={isLoading}
        onClick={loginWithGithub}
      >
        {isLoading ? null : (
          <>
            <Icons.github className="h-4 w-4 mr-2" /> Github
          </>
        )}
      </Button>
    </div>
  );
};

export default UserAuthForm;
