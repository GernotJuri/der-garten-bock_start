"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search, Sun, Moon, Leaf, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { headerContent } from "@/content/components/headerContent";
import { matchSearchQuery } from "@/services/components/headerService";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const href = matchSearchQuery(searchQuery);
      if (href) {
        router.push(href);
        setSearchQuery("");
      }
    }
  };

  return (
      <>
        <header className="sticky top-0 z-40 w-full bg-background/40 backdrop-blur-md border-b border-border garden-shadow">
          <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between relative">
            {/* Logo & Textlogo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="h-16 sm:h-24 flex-shrink-0 relative -mt-2 sm:-mt-4 inline-block">
                <img src={headerContent.logo.dark} alt={headerContent.logo.alt} className="logo-light h-full w-auto object-contain" />
                <img src={headerContent.logo.light} alt={headerContent.logo.alt} className="logo-dark h-full w-auto object-contain" aria-hidden="true" />
              </Link>

              <div className="hidden md:block h-12 md:h-20 relative">
                <img src={headerContent.textLogo.dark} alt={headerContent.textLogo.alt} className="logo-light h-full w-auto object-contain" />
                <img src={headerContent.textLogo.light} alt={headerContent.textLogo.alt} className="logo-dark h-full w-auto object-contain" aria-hidden="true" />
              </div>
            </div>
            
            {/* Toggle & Menübutton */}
            <div className="flex items-center gap-3">
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="leaf-hover"
                  aria-label={headerContent.toggle.ariaLabel}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>
        </header>
      </>
  );
}
