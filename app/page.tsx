'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  SEED_OUTAGES, 
  SEED_NETWORK_HEALTH 
} from '../lib/fallback-data';
import { calculateEventDuration, OutageState } from '../lib/causes';
import { 
  Activity, 
  AlertTriangle, 
  ArrowUpRight, 
  Clock, 
  Quote, 
  Search, 
  Filter, 
  Wifi, 
  Radio, 
  ShieldCheck, 
  Globe2,
  ServerCrash,
  Info
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');

  const filteredOutages = useMemo(() => {
    return SEED_OUTAGES.filter(evt => {
      const matchSearch = evt.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (evt.region && evt.region.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchState = selectedState === 'all' || evt.state === selectedState;
      return matchSearch && matchState;
    });
  }, [searchQuery, selectedState]);

  return (
    <div className="space-y-8">
      {/* Invariant Directive Banner */}
      <div className="bg-brand-soft border border-brand/20 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-brand-ink shadow-sm">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand" />
          <div className="space-y-1">
            <div className="font-bold text-sm sm:text-base">
              INVARIANT DIRECTIVE: An anomaly is not an outage; a cause is always an attributed assertion.
            </div>
            <p className="text-xs sm:text-sm text-text-body leading-relaxed">
              Traffic drops show what changed, not why. <strong>Observations</strong> (traffic drop %, BGP withdrawals) and <strong>Causes</strong> (power cut, subsea severance, state curfew) 
              are held in strictly separate tables. Causes are verbatim quoted statements from named authorities, never inferred from drop percentages.
            </p>
          </div>
        </div>
        <Link 
          href="/method" 
          className="text-xs font-semibold text-brand hover:text-brand-hover whitespace-nowrap flex items-center gap-1 self-end sm:self-center"
        >
          Methodology Guide <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Top Telemetry Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-text-muted flex justify-between">
            <span>ACTIVE DISRUPTIONS</span>
            <span className="text-live font-bold font-mono">LIVE</span>
          </div>
          <div className="text-2xl font-bold font-mono text-text">{SEED_NETWORK_HEALTH.activeDisruptionsCount}</div>
          <div className="text-[10px] text-text-faint font-mono">Monitored Ingest Stream</div>
        </div>

        <div className="bg-white border-2 border-outage/40 p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-outage flex justify-between">
            <span>CORROBORATED OUTAGES</span>
            <span className="bg-outage text-white px-1 rounded text-[10px] font-bold">▲ MULTI</span>
          </div>
          <div className="text-2xl font-bold font-mono text-outage">{SEED_NETWORK_HEALTH.corroboratedOutagesCount}</div>
          <div className="text-[10px] text-text-faint font-mono">2+ Independent Sources</div>
        </div>

        <div className="bg-white border-2 border-shutdown/40 p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-shutdown flex justify-between">
            <span>STATE SHUTDOWNS</span>
            <span className="bg-shutdown text-white px-1 rounded text-[10px] font-bold">■ CURFEW</span>
          </div>
          <div className="text-2xl font-bold font-mono text-shutdown">{SEED_NETWORK_HEALTH.attributedShutdownsCount}</div>
          <div className="text-[10px] text-text-faint font-mono">Attributed Mandate Order</div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-text-muted flex justify-between">
            <span>BGP PREFIX WITHDRAWALS</span>
            <span className="bg-bg-subtle text-text-muted px-1 rounded text-[10px]">RIS</span>
          </div>
          <div className="text-2xl font-bold font-mono text-text">{SEED_NETWORK_HEALTH.bgpWithdrawnPrefixesCount}</div>
          <div className="text-[10px] text-text-faint font-mono">AS42610 Anomaly Detected</div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-text-muted flex justify-between">
            <span>GLOBAL TRAFFIC HEALTH</span>
            <span className="text-live font-bold font-mono">99.8%</span>
          </div>
          <div className="text-2xl font-bold font-mono text-text">99.8%</div>
          <div className="text-[10px] text-text-faint font-mono">Cloudflare Radar Index</div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-1">
          <div className="text-[11px] font-semibold text-text-muted flex justify-between">
            <span>IODA SCANNED ASNs</span>
            <span className="text-text-muted text-[10px]">GEORGIA TECH</span>
          </div>
          <div className="text-2xl font-bold font-mono text-text">{SEED_NETWORK_HEALTH.iodaMonitoredAsns}</div>
          <div className="text-[10px] text-text-faint font-mono">Telescope Darknet Probing</div>
        </div>
      </div>

      {/* State Definitions & Qualitative Distinction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-border p-4 rounded-xl shadow-sm flex items-start space-x-3">
          <div className="w-3.5 h-3.5 rounded-full bg-anomaly flex-shrink-0 mt-1" />
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-text">● ANOMALY (Circle)</div>
            <div className="text-text-muted">Single source observes deviation from baseline. Outage unconfirmed.</div>
          </div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm flex items-start space-x-3">
          <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-outage flex-shrink-0 mt-1" />
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-text">▲ OUTAGE (Triangle)</div>
            <div className="text-text-muted">Two or more independent monitors corroborate widespread drop.</div>
          </div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm flex items-start space-x-3">
          <div className="w-3.5 h-3.5 bg-shutdown flex-shrink-0 mt-1" />
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-text">■ SHUTDOWN (Square)</div>
            <div className="text-text-muted">An authority or civil monitor asserts an intentional restriction order.</div>
          </div>
        </div>

        <div className="bg-white border border-border p-4 rounded-xl shadow-sm flex items-start space-x-3">
          <div className="w-3.5 h-3.5 rounded-full bg-resolved flex-shrink-0 mt-1" />
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-text">● RESOLVED (Circle)</div>
            <div className="text-text-muted">Traffic restored to baseline. Duration computed only for resolved events.</div>
          </div>
        </div>
      </div>

      {/* Main Section Header with Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-xl font-bold font-display text-text flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand" />
              <span>Active Disruption Telemetry Feed</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Corroborated outages, ongoing anomalies, and attributed shutdown declarations
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedState('all')}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                selectedState === 'all'
                  ? 'bg-brand text-white border-brand shadow-sm font-semibold'
                  : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedState('outage')}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                selectedState === 'outage'
                  ? 'bg-outage text-white border-outage shadow-sm font-semibold'
                  : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
              }`}
            >
              ▲ Outages
            </button>
            <button
              onClick={() => setSelectedState('shutdown')}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                selectedState === 'shutdown'
                  ? 'bg-shutdown text-white border-shutdown shadow-sm font-semibold'
                  : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
              }`}
            >
              ■ Shutdowns
            </button>
            <button
              onClick={() => setSelectedState('anomaly')}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                selectedState === 'anomaly'
                  ? 'bg-anomaly text-white border-anomaly shadow-sm font-semibold'
                  : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
              }`}
            >
              ● Anomalies
            </button>
            <button
              onClick={() => setSelectedState('resolved')}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                selectedState === 'resolved'
                  ? 'bg-resolved text-white border-resolved shadow-sm font-semibold'
                  : 'bg-white text-text-muted border-border hover:bg-bg-subtle'
              }`}
            >
              ● Resolved
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-text-faint absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search country or corridor (e.g. Honduras, Red Sea)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm bg-white text-text placeholder-text-faint focus:outline-none focus:border-brand transition-colors"
          />
        </div>

        {/* Outage Cards Feed */}
        <div className="space-y-4">
          {filteredOutages.map((evt) => {
            const dur = calculateEventDuration(evt);
            const isOngoing = !evt.endedAt;

            return (
              <div
                key={evt.id}
                className="bg-white border border-border rounded-xl p-5 sm:p-6 shadow-sm hover:border-brand/40 transition-all hover:shadow space-y-4"
              >
                {/* Event Card Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-border pb-3">
                  <div className="flex items-center space-x-3">
                    {evt.state === 'anomaly' && <span className="w-3.5 h-3.5 rounded-full bg-anomaly flex-shrink-0" title="Anomaly (Circle)" />}
                    {evt.state === 'outage' && <span className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-outage flex-shrink-0" title="Outage (Triangle)" />}
                    {evt.state === 'shutdown' && <span className="w-3.5 h-3.5 bg-shutdown flex-shrink-0" title="Shutdown (Square)" />}
                    {evt.state === 'resolved' && <span className="w-3.5 h-3.5 rounded-full bg-resolved flex-shrink-0" title="Resolved (Circle)" />}

                    <div>
                      <h3 className="font-bold text-text text-base">
                        {evt.country} {evt.region ? `· ${evt.region}` : ''}
                      </h3>
                      <div className="text-xs text-text-muted font-mono">{evt.countryIso} · Started {evt.startedAt.slice(0, 16).replace('T', ' ')} UTC</div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider ${
                      evt.state === 'shutdown' ? 'bg-shutdown text-white' :
                      evt.state === 'outage' ? 'bg-outage text-white' :
                      evt.state === 'anomaly' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    }`}>
                      {evt.state}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-text-body flex items-center gap-2 self-end sm:self-center">
                    <span className={`px-2.5 py-1 rounded border font-semibold ${
                      isOngoing ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-bg-subtle text-text-muted border-border'
                    }`}>
                      {dur.label}
                    </span>
                  </div>
                </div>

                {/* Quantitative Observation Telemetry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {evt.observations.map((obs) => (
                    <div key={obs.id} className="bg-bg-subtle p-3 rounded-lg border border-border/80 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-text">{obs.sourceName}</span>
                        <span className="font-mono text-brand font-bold">{obs.metric.replace(/_/g, ' ')}: {obs.value}%</span>
                      </div>
                      <div className="text-text-muted text-[11px] leading-relaxed">{obs.baselineNote}</div>
                    </div>
                  ))}
                </div>

                {/* Qualitative Attributed Cause Assertions Block */}
                {evt.causes.length > 0 ? (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
                      <Quote className="w-3.5 h-3.5 text-brand" />
                      <span>ATTRIBUTED CAUSE ASSERTION (SEPARATE FACT FROM OBSERVATION)</span>
                    </div>
                    {evt.causes.map((c) => (
                      <div key={c.id} className="bg-brand-soft/50 border border-brand/20 p-3 sm:p-4 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between items-center font-semibold text-brand-ink">
                          <span>Asserted by {c.sourceName} ({c.attribution})</span>
                          <span className="font-mono uppercase text-[10px] bg-white px-2 py-0.5 rounded border border-brand/20 shadow-xs">
                            {c.assertedCause}
                          </span>
                        </div>
                        <p className="text-text-body italic leading-relaxed">"{c.verbatimQuote}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-text-faint italic pt-2 border-t border-border flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Cause not stated by any reporting authority. (Traffic drops do not inherently possess an attributed cause).</span>
                  </div>
                )}

                {/* Card Footer */}
                <div className="pt-2 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-text-faint font-mono">
                  <span>
                    Severity: {evt.severityScore ? `${evt.severityScore}/100` : 'Provisional'} {isOngoing ? '(Duration Factor Excluded)' : ''}
                  </span>
                  <div className="flex items-center space-x-4">
                    {evt.modelledUsersAffected && (
                      <span className="text-[11px] text-text-muted font-mono">
                        Modelled Impact: {evt.modelledUsersAffected.toLocaleString()} users (never summed)
                      </span>
                    )}
                    {evt.observations[0]?.documentUrl && (
                      <a
                        href={evt.observations[0].documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand hover:underline flex items-center gap-1 font-medium font-ui"
                      >
                        Telemetry Source <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
