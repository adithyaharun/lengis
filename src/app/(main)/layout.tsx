import type { ReactNode } from "react";
import Header from "../_components/molecules/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-h-screen min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="grow overflow-y-auto">{children}</main>
    </div>
  );
}
