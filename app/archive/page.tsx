import React from 'react';

export default function ArchivePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">24-Month Outage Archive</h1>
        <p className="text-sm text-text-muted">Frozen historical archive of resolved connectivity disruptions and cause assertions</p>
      </div>

      <div className="bg-white border border-border rounded-xl p-6 shadow-sm text-sm text-text-muted">
        Archived records are immutable. Outage durations are computed only for resolved events.
      </div>
    </div>
  );
}
