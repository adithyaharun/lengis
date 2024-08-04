"use client";

import { useEffect, useState } from "react";
import { Menu, MenuMobile, MenuTheme } from "./menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/atoms/dialog";
import PrivacyPolicy from "../privacy";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPrivacyPolicyShown, togglePrivacyPolicy] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent;
      const inclMobile = userAgent.includes("Mobi");

      setIsMobile(inclMobile);
    }

    document.addEventListener("app::SHOW_PRIVACY", () => {
      togglePrivacyPolicy(true);
    });
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 flex h-12 items-center border-b border-border bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex max-w-xl items-center justify-between gap-4">
        <div className="flex items-center">
          {isMobile ? <MenuMobile /> : <Menu />}
        </div>
        <div className="grow text-center font-semibold tracking-tighter">
          Cek Harga BBM
        </div>
        <div className="flex justify-end">
          <MenuTheme />
        </div>
      </div>
      <Dialog open={isPrivacyPolicyShown} onOpenChange={togglePrivacyPolicy}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kebijakan Privasi</DialogTitle>
          </DialogHeader>
          <PrivacyPolicy />
        </DialogContent>
      </Dialog>
    </div>
  );
}
