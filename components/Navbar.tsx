"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wifi, RefreshCw, Menu, X } from "lucide-react";
import { useRefreshOnOpen } from "@/lib/freshness";

export function Navbar() {
  const pathname = usePathname();
  const { isStale, timeSinceRefresh, refresh } = useRefreshOnOpen();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = () => {
    setSpinning(true);
    refresh();
    setTimeout(() => setSpinning(false), 600);
  };

  const navLinks = [
    { href: "/", label: "Outage Board" },
    { href: "/routing", label: "BGP Routing" },
    { href: "/history", label: "Shutdown History" },
    { href: "/archive", label: "Archive" },
    { href: "/method", label: "Method" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="border-b border-border bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-brand flex items-center justify-center text-white font-bold">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-extrabold text-lg text-text tracking-tight">NET<span className="text-brand">SIGNAL</span></span>
                <span className="hidden md:inline-block ml-2 text-xs font-mono text-text-muted px-1.5 py-0.5 rounded bg-bg-subtle border border-border">OUTAGES·BGP</span>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 sm:space-x-4 text-sm font-medium">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    active ? "bg-brand-soft text-brand font-semibold" : "text-text-muted hover:text-text hover:bg-bg-subtle"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="h-4 w-px bg-border mx-1" />

            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-live mr-1.5 animate-pulse" />
                LIVE 90s
              </span>
              {isStale && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono bg-amber-50 text-amber-700 border border-amber-200">
                  STALE
                </span>
              )}
              <span className="text-[11px] font-mono text-text-faint hidden sm:inline">{timeSinceRefresh}</span>
              <button
                onClick={handleRefresh}
                className="p-1.5 text-text-muted hover:text-brand hover:bg-bg-subtle rounded-md transition-colors"
                title="Refresh Outage Stream (30s throttle)"
                aria-label="Refresh feeds"
              >
                <RefreshCw className={`w-4 h-4 ${spinning ? 'animate-spin text-brand' : ''}`} />
              </button>
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-live mr-1 animate-pulse" />
              LIVE
            </span>
            <button
              onClick={handleRefresh}
              className="p-1.5 text-text-muted hover:text-brand rounded-md"
              aria-label="Refresh feeds"
            >
              <RefreshCw className={`w-4 h-4 ${spinning ? 'animate-spin text-brand' : ''}`} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-text rounded-md hover:bg-bg-subtle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-text" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 py-3 space-y-1 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname === link.href ? "bg-brand-soft text-brand font-semibold" : "text-text hover:bg-bg-subtle"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
