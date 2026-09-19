'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Wifi, RefreshCw, Activity, ShieldAlert, Route, History, BookOpen } from 'lucide-react';
import { useRefreshOnOpen } from '../lib/freshness';

export default function Navbar() {
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

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center text-white">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-text tracking-tight flex items-center space-x-2">
                <span>NETSIGNAL</span>
                <span className="bg-brand-soft text-brand-ink text-xs px-2 py-0.5 rounded-full font-mono">VOL-II</span>
              </div>
              <div className="text-xs text-text-muted">Internet Outage & Network-Integrity Monitor</div>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-text-body">
          <Link href="/" className="hover:text-brand transition-colors">Outage Board</Link>
          <Link href="/routing" className="hover:text-brand transition-colors">BGP Routing</Link>
          <Link href="/history" className="hover:text-brand transition-colors">Shutdown History</Link>
          <Link href="/archive" className="hover:text-brand transition-colors">24M Archive</Link>
          <Link href="/method" className="hover:text-brand transition-colors">Methodology</Link>
          <Link href="/admin" className="hover:text-brand transition-colors">Admin</Link>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex flex-col items-end text-xs">
            <span className="text-text-muted">Synced: {lastRefreshed}</span>
            <span className="text-live flex items-center gap-1 font-mono">● LIVE 90s POLL</span>
          </div>
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="p-2 border border-border rounded-lg hover:bg-bg-subtle text-text-body transition-colors disabled:opacity-50"
            title="Refresh feeds"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-brand' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
