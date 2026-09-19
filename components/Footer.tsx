import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-subtle border-t border-border mt-16 py-8 text-sm text-text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="font-bold text-text">NETSIGNAL</div>
            <div className="text-xs text-text-faint">Part 18 of THE MONITOR SERIES — VOLUME II</div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/method" className="hover:text-brand">Anomaly vs Outage vs Shutdown</Link>
            <Link href="/method" className="hover:text-brand">Cause is an Attributed Assertion</Link>
            <Link href="/method" className="hover:text-brand">Ongoing Duration Unknown</Link>
            <Link href="/method" className="hover:text-brand">Modelled Users Not Summed</Link>
            <Link href="/admin" className="hover:text-brand">Feeds Status</Link>
          </div>
        </div>
        <div className="text-xs text-text-faint border-t border-border pt-4">
          Notice: Traffic drops never inherently possess a cause; causes are attributed assertions by named institutions with verbatim citations. 
          State categories (Anomaly, Outage, Shutdown) are distinguished by explicit qualitative definitions and distinct geometric symbols.
        </div>
      </div>
    </footer>
  );
}
