'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wifi, RefreshCw, Menu, X, Activity, Route } from 'lucide-react';
import { useRefreshOnOpen } from '../lib/freshness';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  useRefreshOnOpen(() => {
    setLastRefreshed(new Date().toLocaleTimeString());
  });

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefreshed(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 600);
  };

  const navLinks = [
    { href: '/', label: 'Outage Board' },
    { href: '/routing', label: 'BGP Routing' },
    { href: '/history', label: 'Shutdown History' },
    { href: '/archive', label: '24M Archive' },
    { href: '/method', label: 'Methodology' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center text-white shadow-sm group-hover:bg-brand-hover transition-colors">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display font-extrabold text-lg text-text tracking-tight flex items-center space-x-2">
              <span>NET<span className="text-brand">SIGNAL</span></span>
              <span className="bg-brand-soft text-brand-ink text-[11px] font-mono px-2 py-0.5 rounded-full border border-brand/20">
                VOL-II
              </span>
            </div>
            <div className="text-[11px] text-text-muted hidden sm:block">
              Internet Outage & Network-Integrity Monitor
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  active
                    ? 'bg-brand-soft text-brand-ink font-semibold'
                    : 'text-text-muted hover:text-text hover:bg-bg-subtle'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Live Status & Controls */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex flex-col items-end text-xs">
            <span className="text-text-muted">Synced: {lastRefreshed}</span>
            <span className="text-live flex items-center gap-1 font-mono font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-live animate-ping" />
              LIVE 90s POLL
            </span>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="p-2 border border-border rounded-lg hover:bg-bg-subtle text-text-body transition-colors disabled:opacity-50 min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Refresh feeds (30s throttle)"
            aria-label="Refresh feeds"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-brand' : 'text-text-muted'}`} />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 border border-border rounded-lg text-text-body hover:bg-bg-subtle transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-border text-xs text-text-muted">
            <span>Radar & IODA: <strong className="text-live">● Active 90s Stream</strong></span>
            <span>Synced: {lastRefreshed}</span>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-brand-soft text-brand-ink font-semibold'
                    : 'text-text-body hover:bg-bg-subtle'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
