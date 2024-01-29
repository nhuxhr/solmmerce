import React from "react";
import Image from "next/image";

import LogoLight from "@/assets/images/logo/light.svg";
import LogoDark from "@/assets/images/logo/dark.svg";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <>
      <Image
        className={cn("w-auto h-8 block dark:hidden", className)}
        src={LogoLight}
        alt="Logo"
      />
      <Image
        className={cn("w-auto h-8 hidden dark:block", className)}
        src={LogoDark}
        alt="Logo"
      />
    </>
  );
};

export default Logo;
