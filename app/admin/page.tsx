'use client';
import React from 'react';

export default function AdminPage() {
  const feeds = [
    { id: 'cloudflare-radar', name: 'Cloudflare Radar Outage Center', tier: 'A', cadence: '15 min', status: 'Healthy', items: 25 },
    { id: 'ioda', name: 'IODA (Georgia Tech)', tier: 'A', cadence: '15 min', status: 'Healthy', items: 60 },
    { id: 'ripe-ris', name: 'RIPE RIS BGP Stream', tier: 'A', cadence: '1 hr', status: 'Healthy', items: 120 },
    { id: 'netblocks', name: 'NetBlocks Civil Telemetry', tier: 'B', cadence: 'Realtime', status: 'Healthy', items: 15 },
    { id: 'isoc-pulse', name: 'Internet Society Pulse', tier: 'B', cadence: 'Daily', status: 'Healthy', items: 10 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-text">NETSIGNAL Admin & Telemetry Feeds</h1>
        <p className="text-sm text-text-muted">Connector heartbeat and state machine audit</p>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg-subtle border-b border-border text-xs font-semibold text-text-muted">
            <tr>
              <th className="p-4">SOURCE</th>
              <th className="p-4">TIER</th>
              <th className="p-4">CADENCE</th>
              <th className="p-4">STATUS</th>
              <th className="p-4">INGESTED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border font-mono text-xs">
            {feeds.map((f) => (
              <tr key={f.id} className="hover:bg-bg-subtle/50">
                <td className="p-4 font-bold font-ui text-text">{f.name}</td>
                <td className="p-4"><span className="bg-brand-soft text-brand-ink px-1.5 py-0.5 rounded">{f.tier}</span></td>
                <td className="p-4 text-text-body">{f.cadence}</td>
                <td className="p-4 text-live font-bold">{f.status}</td>
                <td className="p-4 text-text-body">{f.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
