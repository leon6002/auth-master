"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { SiGitee } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = (provider: "gitee" | "dy" | "github" | "google") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      <div className="flex w-full items-center gap-x-2">
        <Button
          size="lg"
          variant={"outline"}
          className="w-full"
          onClick={() => onClick("gitee")}
        >
          <SiGitee color="red" />
        </Button>
        <Button
          size="lg"
          variant={"outline"}
          className="w-full"
          onClick={() => onClick("dy")}
        >
          <FaTiktok />
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-2">
        <Button
          size="lg"
          variant={"outline"}
          className="w-full"
          onClick={() => onClick("github")}
        >
          <FaGithub />
        </Button>
        {/* <Button
          size="lg"
          variant={"outline"}
          className="w-full"
          onClick={() => onClick("google")}
        >
          <FcGoogle />
        </Button> */}
      </div>
    </div>
  );
};

export default Social;
