import React from 'react';
import Link from 'next/link';
import { SEED_OUTAGES } from '../lib/fallback-data';
import { calculateEventDuration } from '../lib/causes';
import { Activity, AlertTriangle, ArrowUpRight, Clock, ShieldCheck, Quote } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Notice Banner */}
      <div className="bg-brand-soft border border-brand/20 p-4 rounded-xl flex items-start space-x-3 text-sm text-brand-ink">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand" />
        <div className="space-y-1">
          <div className="font-semibold">CORE CORRECTNESS PRINCIPLE: An anomaly is not an outage; a cause is always an attributed assertion.</div>
          <div className="text-xs text-text-body">
            Traffic drops show what changed, not why. <strong>Observations</strong> (traffic collapse, BGP withdrawals) and <strong>Causes</strong> (power outage, cable cut, government shutdown) 
            are stored in separate tables. Causes are verbatim quoted statements from named authorities, never inferred from traffic graphs.
          </div>
        </div>
      </div>

      {/* State Definitions Key */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-bg-subtle border border-border p-4 rounded-xl flex items-start space-x-3">
          <div className="w-4 h-4 rounded-full bg-anomaly flex-shrink-0 mt-1" />
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-text">● ANOMALY</div>
            <div className="text-text-muted">One source observes deviation from baseline. No disruption confirmed.</div>
          </div>
        </div>

        <div className="bg-bg-subtle border border-border p-4 rounded-xl flex items-start space-x-3">
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-outage flex-shrink-0 mt-1" />
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-text">▲ OUTAGE</div>
            <div className="text-text-muted">Two or more independent sources corroborate widespread disruption.</div>
          </div>
        </div>

        <div className="bg-bg-subtle border border-border p-4 rounded-xl flex items-start space-x-3">
          <div className="w-3.5 h-3.5 bg-shutdown flex-shrink-0 mt-1" />
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-text">■ SHUTDOWN</div>
            <div className="text-text-muted">A named authority or civil society monitor asserts a government-mandated curfew.</div>
          </div>
        </div>
      </div>

      {/* Primary Event Feed */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold font-display text-text">Active & Recent Disruption Telemetry</h2>
          <span className="px-2.5 py-1 rounded bg-bg-subtle border border-border text-xs font-mono text-text-muted">
            Newest First
          </span>
        </div>

        <div className="space-y-4">
          {SEED_OUTAGES.map((evt) => {
            const dur = calculateEventDuration(evt);
            const isOngoing = !evt.endedAt;

            return (
              <div key={evt.id} className="bg-white border border-border rounded-xl p-6 shadow-sm hover:border-brand/40 transition-colors space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center space-x-3">
                    {evt.state === 'anomaly' && <span className="w-3.5 h-3.5 rounded-full bg-anomaly flex-shrink-0" title="Anomaly (Circle)" />}
                    {evt.state === 'outage' && <span className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-outage flex-shrink-0" title="Outage (Triangle)" />}
                    {evt.state === 'shutdown' && <span className="w-3.5 h-3.5 bg-shutdown flex-shrink-0" title="Shutdown (Square)" />}
                    {evt.state === 'resolved' && <span className="w-3.5 h-3.5 rounded-full bg-resolved flex-shrink-0" title="Resolved" />}
                    
                    <h3 className="font-bold text-text text-base">
                      {evt.country} {evt.region ? `· ${evt.region}` : ''}
                    </h3>
                    <span className="px-2 py-0.5 bg-brand-soft text-brand-ink text-xs rounded font-mono font-bold uppercase">
                      {evt.state}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-text-faint flex items-center gap-2">
                    <span className="bg-bg-subtle px-2 py-1 rounded border border-border">
                      {dur.label}
                    </span>
                    <span>Started: {evt.startedAt.slice(0, 16).replace('T', ' ')} UTC</span>
                  </div>
                </div>

                {/* Observations Band */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {evt.observations.map((obs) => (
                    <div key={obs.id} className="bg-bg-subtle p-3 rounded-lg border border-border/80 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-text">{obs.sourceName}</span>
                        <span className="font-mono text-brand font-semibold">{obs.metric.replace(/_/g, ' ')}: {obs.value}%</span>
                      </div>
                      <div className="text-text-muted text-[11px]">{obs.baselineNote}</div>
                    </div>
                  ))}
                </div>

                {/* Attributed Causes Band */}
                {evt.causes.length > 0 ? (
                  <div className="space-y-2 pt-1 border-t border-border">
                    <div className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
                      <Quote className="w-3.5 h-3.5 text-brand" />
                      <span>ATTRIBUTED CAUSE ASSERTION</span>
                    </div>
                    {evt.causes.map((c) => (
                      <div key={c.id} className="bg-brand-soft/40 border border-brand/20 p-3 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between items-center font-semibold text-brand-ink">
                          <span>Asserted by {c.sourceName} ({c.attribution})</span>
                          <span className="font-mono uppercase text-[10px] bg-white px-1.5 py-0.5 rounded border border-brand/20">
                            {c.assertedCause}
                          </span>
                        </div>
                        <p className="text-text-body italic">"{c.verbatimQuote}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-text-faint italic pt-1 border-t border-border">
                    Cause not stated by any reporting authority.
                  </div>
                )}

                <div className="pt-2 border-t border-border flex justify-between items-center text-xs text-text-faint">
                  <span>Severity Score: {evt.severityScore ? `${evt.severityScore}/100` : 'Provisional'}</span>
                  <div className="flex items-center space-x-4">
                    {evt.observations[0]?.documentUrl && (
                      <a href={evt.observations[0].documentUrl} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline flex items-center gap-0.5">
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
