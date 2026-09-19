import React from 'react';

export default function MethodPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">NETSIGNAL Methodology & Invariant Principles</h1>
        <p className="text-sm text-text-muted">The core architectural directives that protect network telemetry integrity</p>
      </div>

      <div className="space-y-4 text-sm text-text-body leading-relaxed">
        <div className="bg-white border border-border rounded-xl p-5 space-y-2">
          <h2 className="font-bold text-text text-base">1. Anomaly vs Outage vs Shutdown</h2>
          <p className="text-text-muted">
            An Anomaly is a single-source deviation. An Outage is a multi-source corroborated disruption. 
            A Shutdown is a disruption where a named source asserts a government-mandated restriction. 
            The three states have distinct criteria and geometric symbols.
          </p>
        </div>

        <div className="bg-white border border-border rounded-xl p-5 space-y-2">
          <h2 className="font-bold text-text text-base">2. Cause Is an Attributed Assertion</h2>
          <p className="text-text-muted">
            Traffic graphs never reveal intent. Power outages, subsea cable severances, and state curfews look identical in traffic volume. 
            Causes are stored as attributed assertions with verbatim quotations, never inferred from drop percentages.
          </p>
        </div>

        <div className="bg-white border border-border rounded-xl p-5 space-y-2">
          <h2 className="font-bold text-text text-base">3. Ongoing Events Have Unknown Duration</h2>
          <p className="text-text-muted">
            While an event is active, its duration is inherently unknown. The UI renders "ongoing — duration unknown" and never displays speculative recovery times.
          </p>
        </div>

        <div className="bg-white border border-border rounded-xl p-5 space-y-2">
          <h2 className="font-bold text-text text-base">4. Modelled Users Are Never Summed</h2>
          <p className="text-text-muted">
            Figures representing 'users affected' are synthetic models. Summing them across events produces misleading headline inflation and is programmatically blocked.
          </p>
        </div>
      </div>
    </div>
  );
}
