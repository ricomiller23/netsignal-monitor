import React from 'react';

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">Who Shuts Down, How Often</h1>
        <p className="text-sm text-text-muted">24-month historical record of government-mandated shutdowns backed strictly by attributed civil society citations</p>
      </div>

      <div className="bg-white border border-border rounded-xl p-6 shadow-sm text-sm text-text-muted space-y-3">
        <p>
          This view documents deliberate network restrictions verified by Access Now, NetBlocks, and regulatory gazettes. 
          Entries require documented executive orders or corroborated field reporting.
        </p>
      </div>
    </div>
  );
}
