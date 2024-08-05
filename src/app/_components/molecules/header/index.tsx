"use client";

import { useEffect, useState } from "react";
import { Menu, MenuMobile, MenuTheme } from "./menu";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent;
      const inclMobile = userAgent.includes("Mobi");

      setIsMobile(inclMobile);
    }
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 flex h-12 items-center border-b border-border bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex max-w-xl items-center justify-between gap-4">
        <div className="flex items-center">
          {pathname !== "/" ? (
            <ArrowLeftIcon
              className="cursor-pointer"
              onClick={() => router.back()}
            />
          ) : isMobile ? (
            <MenuMobile />
          ) : (
            <Menu />
          )}
        </div>
        <div className="grow text-center font-semibold tracking-tighter">
          Cek Harga BBM
        </div>
        <div className="flex justify-end">
          <MenuTheme />
        </div>
      </div>
    </div>
  );
}
