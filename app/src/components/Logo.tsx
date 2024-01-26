import React from "react";
import Image from "next/image";

import LogoLight from "@/assets/images/logo/light.svg";
import LogoDark from "@/assets/images/logo/dark.svg";

const Logo = () => {
  return (
    <>
      <Image
        className="w-auto h-8 block dark:hidden"
        src={LogoLight}
        alt="Logo"
      />
      <Image
        className="w-auto h-8 hidden dark:block"
        src={LogoDark}
        alt="Logo"
      />
    </>
  );
};

export default Logo;
