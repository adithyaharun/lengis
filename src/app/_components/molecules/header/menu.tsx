import { ExternalLinkIcon, MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "~/app/_components/atoms/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/app/_components/atoms/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/atoms/dropdown-menu";

export function MenuMobile() {
  return (
    <Drawer>
      <DrawerTrigger className="outline-none">
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Cek Harga BBM!</DrawerTitle>
          <DrawerDescription>
            <code>LENGIS_20240727_1_0_113</code>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Link href="/privacy">
            <Button variant="secondary">Kebijakan Privasi</Button>
          </Link>
          <Link href="https://github.com/adithyaharun/lengis">
            <Button variant="secondary">GitHub</Button>
          </Link>
          <DrawerClose>Tutup</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel className="flex flex-col text-sm">
          <p className="font-semibold">Cek Harga BBM!</p>
          <code className="text-black/50 dark:text-white/50">1.0</code>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/privacy">Kebijakan Privasi</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between" asChild>
          <Link href="https://github.com/adithyaharun/lengis" target="_blank">
            <span>GitHub</span>
            <ExternalLinkIcon size="16" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Close</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MenuTheme() {
  const { setTheme, theme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="relative">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <MoonIcon className="absolute top-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value)}
        >
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
