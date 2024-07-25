"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = (provider: "google" | "github" | "gitee" | "dy") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        variant={"outline"}
        className="w-full"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant={"outline"}
        className="w-full"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant={"outline"}
        className="w-full"
        onClick={() => onClick("gitee")}
      >
        Gitee
      </Button>
      <Button
        size="lg"
        variant={"outline"}
        className="w-full"
        onClick={() => onClick("dy")}
      >
        抖音登录
      </Button>
    </div>
  );
};

export default Social;
