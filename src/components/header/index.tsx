"use client"

import { useEffect, useState } from "react";
import { Menu, MenuMobile, MenuTheme } from "./menu";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="fixed left-0 right-0 top-0 h-12 border-b border-border bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center">
      <div className="container max-w-xl flex gap-4 items-center justify-between">
        <div className="flex items-center">
          {isMobile ? <MenuMobile /> : <Menu />}
        </div>
        <div className="font-semibold tracking-tighter grow">Cek Harga BBM</div>
        <div className="flex justify-end">
          <MenuTheme />
        </div>
      </div>
    </div>
  );
}
