import type { ReactNode } from "react";
import Header from "../../components/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen max-h-screen flex-col overflow-hidden">
      <Header />
      <main className="grow overflow-y-auto">{children}</main>
    </div>
  );
}
