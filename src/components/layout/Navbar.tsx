import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../shared/ThemeToggle";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/">
            <div className="cursor-pointer flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}usher-logo.jpg`}
                alt="USHER — IT Services & Consulting"
                className="h-9 md:h-10 w-auto rounded-md object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <div
                      className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer relative ${
                        location === link.path
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.name}
                      {location === link.path && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-l border-border/50 pl-4">
              <ThemeToggle />
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-foreground p-1"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 px-4">
              <div className="flex items-center gap-2">
                <img
                  src={`${import.meta.env.BASE_URL}usher-logo.jpg`}
                  alt="USHER"
                  className="h-9 w-auto rounded-md object-contain"
                />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-muted rounded-full text-foreground"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center p-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={link.path}>
                    <div
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-bold tracking-tight cursor-pointer ${
                        location === link.path
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </div>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-border/50"
              >
                <Link href="/contact">
                  <Button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg"
                  >
                    Start a Project
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
