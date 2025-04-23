"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function NavbarDemo() {
  const router = useRouter();
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    if (token) {
      try {
        const parsed = jwt.decode(JSON.parse(token));
        setDecoded(parsed);
      } catch {
        localStorage.removeItem("AuthToken");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("AuthToken");
    window.location.reload();
  };

  return (
    <nav className="w-full px-4 py-3 shadow-sm sticky top-0 z-50 bg-white dark:bg-neutral-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between cursor-custom">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2 cursor-custom">
          <img src="/favicon.png" alt="logo" className="h-6 w-6" />
          <span className="text-lg font-semibold text-black dark:text-white">
            WhisperGram
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {!decoded ? (
            <div
              className="font-semibold cursor-custom"
              onClick={() => router.push("/login")}
            >
              Login
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="font-semibold cursor-custom ">
                  Hi {decoded.name}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <div variant="ghost">
                <Menu size={20} />
              </div>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">Menu</span>
                </div>
              </SheetHeader>
              <div className="flex flex-col">
                {!decoded ? (
                  <div
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Login
                  </div>
                ) : (
                  <div className="pl-5 space-y-5 font-medium">
                    <div onClick={() => router.push("/dashboard")}>
                      Dashboard
                    </div>
                    <div onClick={logout}>Log out</div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
