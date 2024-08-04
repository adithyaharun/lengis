import type { ReactNode } from "react";
import Header from "../../components/molecules/header";
import { TRPCReactProvider } from "~/trpc/react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <TRPCReactProvider>
      <div className="flex max-h-screen min-h-screen flex-col overflow-hidden">
        <Header />
        <main className="grow overflow-y-auto">{children}</main>
      </div>
    </TRPCReactProvider>
  );
}
