'use client';

import { GlobalOutageMap } from "@/components/GlobalOutageMap";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  SEED_OUTAGES, 
  SEED_NETWORK_HEALTH 
} from '@/lib/fallback-data';
import { calculateEventDuration } from '@/lib/causes';
import { 
  Activity, 
  AlertTriangle, 
  ExternalLink, 
  Quote, 
  Info, 
  Search 
} from 'lucide-react';

export default function LiveBoardPage() {
  const [filterMode, setFilterMode] = useState<'all' | 'outage' | 'shutdown' | 'anomaly' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOutages = useMemo(() => {
    return SEED_OUTAGES.filter((evt) => {
      const matchSearch = evt.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (evt.region && evt.region.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchFilter = filterMode === 'all' || evt.state === filterMode;
      return matchSearch && matchFilter;
    });
  }, [searchQuery, filterMode]);

  return (
    <div className="space-y-8">
      {/* Hero Banner with Unified Metrics Strip */}
      <div className="bg-bg-subtle border border-border rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-display font-bold text-text">Global Internet Outage & Network-Integrity Monitor</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-100 text-amber-900 border border-amber-300">
              Seed Active
            </span>
          </div>
          <p className="text-sm text-text-muted mt-1">
            Where connectivity is disrupted — and who is saying why. Observations and causes are stored as strictly isolated facts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
          <div className="bg-white border border-border px-3 py-2 rounded-md shadow-sm">
            <span className="text-text-muted">Active Disruptions:</span> <strong className="text-text font-bold num-tabular">{SEED_NETWORK_HEALTH.activeDisruptionsCount}</strong>
          </div>
          <div className="bg-white border border-border px-3 py-2 rounded-md shadow-sm">
            <span className="text-text-muted">Corroborated Outages:</span> <strong className="text-danger font-bold num-tabular">▲ {SEED_NETWORK_HEALTH.corroboratedOutagesCount}</strong>
          </div>
          <div className="bg-white border border-border px-3 py-2 rounded-md shadow-sm">
            <span className="text-text-muted">Attributed Curfews:</span> <strong className="text-purple-700 font-bold num-tabular">■ {SEED_NETWORK_HEALTH.attributedShutdownsCount}</strong>
          </div>
        </div>
      </div>

      {/* Top Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block font-mono">Active Disruptions Monitored</span>
          <div className="text-2xl font-bold font-mono text-text num-tabular mt-1">
            {SEED_NETWORK_HEALTH.activeDisruptionsCount} Events
          </div>
          <span className="text-[10px] text-text-faint font-mono">Cloudflare Radar & IODA Ingest</span>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block font-mono">Corroborated Outages (▲)</span>
          <div className="text-2xl font-bold font-mono text-danger num-tabular mt-1">
            {SEED_NETWORK_HEALTH.corroboratedOutagesCount} Multi-Source
          </div>
          <span className="text-[10px] text-text-faint font-mono">2+ Independent Sources Corroborated</span>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block font-mono">State-Mandated Shutdowns (■)</span>
          <div className="text-2xl font-bold font-mono text-purple-700 num-tabular mt-1">
            {SEED_NETWORK_HEALTH.attributedShutdownsCount} Declaration
          </div>
          <span className="text-[10px] text-text-faint font-mono">Attributed Government Curfew Directive</span>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-sm">
          <span className="text-text-muted text-[11px] block font-mono">BGP Prefix Withdrawals</span>
          <div className="text-2xl font-bold font-mono text-amber-700 num-tabular mt-1">
            {SEED_NETWORK_HEALTH.bgpWithdrawnPrefixesCount} Prefixes
          </div>
          <span className="text-[10px] text-text-faint font-mono">RIPE RIS Anomaly on AS42610</span>
        </div>
      </div>

      {/* Strict Invariant Warning Strip */}
      <div className="border-l-4 border-brand bg-brand-soft/40 p-4 rounded-r-md text-xs text-brand-ink leading-relaxed font-mono">
        <strong>Observation ≠ Cause Invariant:</strong> Traffic drops show what changed, not why. Quantitative observations (traffic collapse %, BGP withdrawals) and Qualitative causes (power cut, subsea severance, government shutdown) are held in separate tables. Causes are verbatim quoted statements from named authorities, never inferred from traffic graphs. Active disruptions strictly report <code className="bg-white px-1 py-0.5 rounded">ongoing — duration unknown</code>.
      </div>

      {/* Geometric State Definitions Key */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-white border border-border p-3 rounded-lg shadow-sm flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-amber-600 flex-shrink-0" />
          <div>
            <strong className="text-text">● ANOMALY</strong>
            <span className="text-text-muted block text-[11px]">Single-source deviation</span>
          </div>
        </div>

        <div className="bg-white border border-border p-3 rounded-lg shadow-sm flex items-center space-x-2">
          <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-danger flex-shrink-0" />
          <div>
            <strong className="text-text">▲ OUTAGE</strong>
            <span className="text-text-muted block text-[11px]">2+ Corroborated sources</span>
          </div>
        </div>

        <div className="bg-white border border-border p-3 rounded-lg shadow-sm flex items-center space-x-2">
          <span className="w-2.5 h-2.5 bg-purple-700 flex-shrink-0" />
          <div>
            <strong className="text-text">■ SHUTDOWN</strong>
            <span className="text-text-muted block text-[11px]">Attributed mandate order</span>
          </div>
        </div>

        <div className="bg-white border border-border p-3 rounded-lg shadow-sm flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-live flex-shrink-0" />
          <div>
            <strong className="text-text">● RESOLVED</strong>
            <span className="text-text-muted block text-[11px]">Restored connectivity</span>
          </div>
        </div>
      </div>

      <GlobalOutageMap />

      {/* Main Events Feed Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg font-display font-bold text-text flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand" />
            <span>Active Monitored Disruption Feed</span>
            <span className="text-xs font-mono text-text-muted font-normal">({filteredOutages.length} Events)</span>
          </h2>

          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded border transition ${
                filterMode === 'all' ? 'bg-brand text-white border-brand font-bold' : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilterMode('outage')}
              className={`px-2.5 py-1 rounded border transition ${
                filterMode === 'outage' ? 'bg-danger text-white border-danger font-bold' : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
              }`}
            >
              ▲ Outages
            </button>
            <button
              onClick={() => setFilterMode('shutdown')}
              className={`px-2.5 py-1 rounded border transition ${
                filterMode === 'shutdown' ? 'bg-purple-700 text-white border-purple-700 font-bold' : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
              }`}
            >
              ■ Shutdowns
            </button>
            <button
              onClick={() => setFilterMode('anomaly')}
              className={`px-2.5 py-1 rounded border transition ${
                filterMode === 'anomaly' ? 'bg-amber-600 text-white border-amber-600 font-bold' : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
              }`}
            >
              ● Anomalies
            </button>
            <button
              onClick={() => setFilterMode('resolved')}
              className={`px-2.5 py-1 rounded border transition ${
                filterMode === 'resolved' ? 'bg-live text-white border-live font-bold' : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
              }`}
            >
              ● Resolved
            </button>
          </div>
        </div>

        {/* Disruption Cards */}
        <div className="grid grid-cols-1 gap-5">
          {filteredOutages.map((evt) => {
            const dur = calculateEventDuration(evt);
            const isOngoing = !evt.endedAt;

            return (
              <div key={evt.id} className="bg-white border border-border rounded-lg p-6 hover:border-brand/40 transition-shadow shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                        evt.state === 'shutdown' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                        evt.state === 'outage' ? 'bg-red-50 text-red-900 border border-red-300' :
                        evt.state === 'anomaly' ? 'bg-amber-50 text-amber-900 border border-amber-300' :
                        'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {evt.state.toUpperCase()}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-bg-subtle text-text-muted border border-border">
                        Started {evt.startedAt.slice(0, 16).replace('T', ' ')} UTC
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-semibold ${
                        isOngoing ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-bg-subtle text-text-muted border border-border'
                      }`}>
                        {dur.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-display text-text">
                      {evt.country} {evt.region ? `· ${evt.region}` : ''}
                    </h3>
                    <p className="text-xs text-text-muted font-mono mt-0.5">ISO: {evt.countryIso} · Telemetry Ingest Confirmed</p>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-xs text-text-faint block">SEVERITY SCORE</span>
                    <span className="text-2xl font-bold text-text num-tabular">
                      {evt.severityScore ? `${evt.severityScore}/100` : 'Provisional'}
                    </span>
                  </div>
                </div>

                {/* Observation Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4 border-b border-border">
                  {evt.observations.map((obs) => (
                    <div key={obs.id} className="bg-bg-subtle p-3 rounded-md text-xs font-mono">
                      <div className="flex justify-between items-center">
                        <strong className="text-text">{obs.sourceName}</strong>
                        <span className="text-brand font-bold">{obs.metric.replace(/_/g, ' ')}: {obs.value}%</span>
                      </div>
                      <p className="text-text-muted text-[11px] mt-1 leading-relaxed">{obs.baselineNote}</p>
                    </div>
                  ))}
                </div>

                {/* Attributed Cause Assertions Block */}
                {evt.causes.length > 0 ? (
                  <div className="space-y-2 py-3 border-b border-border text-xs">
                    <span className="font-mono text-text-muted font-semibold flex items-center gap-1.5">
                      <Quote className="w-3.5 h-3.5 text-brand" />
                      Attributed Cause Assertion (Separated from Observation):
                    </span>
                    {evt.causes.map((c) => (
                      <div key={c.id} className="bg-brand-soft/40 border border-brand/20 p-3 rounded-md space-y-1">
                        <div className="flex justify-between items-center font-mono font-semibold text-brand-ink">
                          <span>Asserted by {c.sourceName} ({c.attribution})</span>
                          <span className="uppercase text-[10px] bg-white px-1.5 py-0.5 rounded border border-brand/20">
                            {c.assertedCause}
                          </span>
                        </div>
                        <p className="text-text-body font-mono text-[11px] italic leading-relaxed">
                          "{c.verbatimQuote}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-3 border-b border-border text-xs text-text-faint font-mono italic flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Cause not stated by any reporting authority. (Traffic drops do not inherently possess an attributed cause).</span>
                  </div>
                )}

                {/* Card Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 text-xs text-text-muted">
                  <div className="font-mono text-[11px]">
                    {evt.modelledUsersAffected ? (
                      <span>Modelled Impact: <strong className="text-text">{evt.modelledUsersAffected.toLocaleString()} users</strong> (never summed globally)</span>
                    ) : (
                      <span>Corroboration: <strong className="text-text">{evt.observations.length} independent stream(s)</strong></span>
                    )}
                  </div>
                  {evt.observations[0]?.documentUrl && (
                    <a
                      href={evt.observations[0].documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-brand hover:underline font-mono text-[11px]"
                    >
                      <span>View Primary Telemetry Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
