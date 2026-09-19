import React from 'react';

export default function RoutingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">BGP Routing & Prefix Reachability</h1>
        <p className="text-sm text-text-muted">RouteViews and RIPE RIS global prefix telemetry</p>
      </div>

      <div className="bg-white border border-border rounded-xl p-6 shadow-sm text-sm text-text-muted space-y-2">
        <p>
          BGP routing updates (withdrawals, route leaks, AS path anomalies) describe topological routing table changes, 
          not operational intent. Prefix withdrawals are recorded factually without speculative motive attribution.
        </p>
      </div>
    </div>
  );
}
