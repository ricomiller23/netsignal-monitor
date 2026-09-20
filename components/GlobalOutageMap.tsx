'use client';

import React, { useState } from 'react';
import { WifiOff, Radio, ShieldAlert, AlertTriangle, CheckCircle, Info, ExternalLink, Activity } from 'lucide-react';

export type DisruptionState = 'anomaly' | 'outage' | 'shutdown';

export interface ConnectivityEvent {
  id: string;
  title: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  state: DisruptionState;
  observedTrafficDropPct: number;
  corroboratedSources: string[];
  statusText: string;
  causeAssertion: {
    hasStatedCause: boolean;
    sourceName?: string;
    verbatimQuote?: string;
    sourceUrl?: string;
  };
  eventTimestamp: string;
}

export const MONITORED_OUTAGES: ConnectivityEvent[] = [
  {
    id: 'honduras-power',
    title: 'Nationwide Grid Failure Telemetry Disruption',
    region: 'Central America',
    country: 'Honduras',
    lat: 14.0723,
    lng: -87.1921,
    state: 'outage',
    observedTrafficDropPct: 82,
    corroboratedSources: ['Cloudflare Radar Outage Center', 'IODA Internet Health', 'NetBlocks'],
    statusText: 'ongoing — duration unknown',
    causeAssertion: {
      hasStatedCause: true,
      sourceName: 'Empresa Nacional de Energía Eléctrica (ENEE)',
      verbatimQuote: 'Interconexión regional centroamericana sufrió disparo en línea principal de 230kV provocando colapso de subestaciones.',
      sourceUrl: 'https://radar.cloudflare.com/outage-center'
    },
    eventTimestamp: '2026-09-14 06:12 UTC'
  },
  {
    id: 'iberia-subsea',
    title: 'Iberian & Atlantic Basin Transit Degradation',
    region: 'Southwest Europe',
    country: 'Spain & Portugal',
    lat: 40.4168,
    lng: -3.7038,
    state: 'outage',
    observedTrafficDropPct: 48,
    corroboratedSources: ['Cloudflare Radar', 'RIPE RIS'],
    statusText: 'Resolved — historical snapshot',
    causeAssertion: {
      hasStatedCause: false
    },
    eventTimestamp: '2026-08-12 14:00 UTC'
  },
  {
    id: 'redsea-cables',
    title: 'Red Sea Subsea Cable Chokepoint Severance',
    region: 'Bab el-Mandeb / Red Sea',
    country: 'International Waters / Yemen / Djibouti',
    lat: 12.5850,
    lng: 43.3330,
    state: 'outage',
    observedTrafficDropPct: 65,
    corroboratedSources: ['Cloudflare Radar', 'Kentik Global IP Routing', 'NetBlocks'],
    statusText: 'ongoing — duration unknown',
    causeAssertion: {
      hasStatedCause: true,
      sourceName: 'Subsea Cable Consortium Telemetry',
      verbatimQuote: 'Subsea fiber systems AAE-1 and Seacom registered dual acoustic signature cuts in southern Red Sea corridor.',
      sourceUrl: 'https://radar.cloudflare.com'
    },
    eventTimestamp: '2026-09-16 11:30 UTC'
  },
  {
    id: 'east-africa-terrestrial',
    title: 'Nairobi-Mombasa Terrestrial Backhaul Cut',
    region: 'East Africa',
    country: 'Kenya',
    lat: -1.2921,
    lng: 36.8219,
    state: 'anomaly',
    observedTrafficDropPct: 34,
    corroboratedSources: ['IODA (Georgia Tech)'],
    statusText: 'ongoing — duration unknown',
    causeAssertion: {
      hasStatedCause: false
    },
    eventTimestamp: '2026-09-18 19:40 UTC'
  },
  {
    id: 'matsu-strait',
    title: 'Matsu Islands Archipelago Telecom Disruption',
    region: 'Taiwan Strait',
    country: 'Taiwan',
    lat: 26.1550,
    lng: 119.9380,
    state: 'shutdown',
    observedTrafficDropPct: 91,
    corroboratedSources: ['Chunghwa Telecom', 'Access Now', 'NetBlocks'],
    statusText: 'ongoing — duration unknown',
    causeAssertion: {
      hasStatedCause: true,
      sourceName: 'National Communications Commission (NCC)',
      verbatimQuote: 'Submarine cable No. 2 severed by commercial dredging anchor, emergency microwave backhaul active.',
      sourceUrl: 'https://www.ncc.gov.tw'
    },
    eventTimestamp: '2026-09-17 08:15 UTC'
  }
];

function projectGlobalCoords(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 100;
  const y = ((85 - lat) / 170) * 100;
  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(3, Math.min(97, y))
  };
}

export function GlobalOutageMap() {
  const [selectedEvent, setSelectedEvent] = useState<ConnectivityEvent>(MONITORED_OUTAGES[0]);
  const [filterState, setFilterState] = useState<string>('all');

  const filteredEvents = MONITORED_OUTAGES.filter(
    (ev) => filterState === 'all' || ev.state === filterState
  );

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-sm my-6">
      {/* Header bar */}
      <div className="bg-[#F6F8FB] px-5 py-4 border-b border-[#E4E9F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0BA360] animate-pulse"></span>
            <h2 className="text-base font-bold text-[#101828] uppercase tracking-wide">
              Global Internet Disruption & Subsea Cable Tactical Map
            </h2>
            <span className="text-xs bg-[#E4E9F0] text-[#344054] px-2 py-0.5 rounded font-mono font-semibold">
              Cloudflare Radar / IODA / RIPE RIS
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Strict Invariant: Observation ≠ Cause. Shape encoding: ● Anomaly (1 source), ▲ Outage (2+ sources), ■ Shutdown (attributed decree).
          </p>
        </div>

        {/* State filters */}
        <div className="flex items-center gap-1.5 bg-[#FFFFFF] p-1 rounded-lg border border-[#E4E9F0]">
          <button
            onClick={() => setFilterState('all')}
            className={`text-xs px-2.5 py-1 rounded font-medium transition ${
              filterState === 'all' ? 'bg-[#0E63C4] text-[#FFFFFF]' : 'text-[#475467] hover:bg-[#F6F8FB]'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilterState('outage')}
            className={`text-xs px-2 py-1 rounded font-medium transition flex items-center gap-1 ${
              filterState === 'outage' ? 'bg-[#0E63C4] text-[#FFFFFF]' : 'text-[#475467] hover:bg-[#F6F8FB]'
            }`}
          >
            <span>▲</span> Outages
          </button>
          <button
            onClick={() => setFilterState('shutdown')}
            className={`text-xs px-2 py-1 rounded font-medium transition flex items-center gap-1 ${
              filterState === 'shutdown' ? 'bg-[#0E63C4] text-[#FFFFFF]' : 'text-[#475467] hover:bg-[#F6F8FB]'
            }`}
          >
            <span>■</span> Shutdowns
          </button>
          <button
            onClick={() => setFilterState('anomaly')}
            className={`text-xs px-2 py-1 rounded font-medium transition flex items-center gap-1 ${
              filterState === 'anomaly' ? 'bg-[#0E63C4] text-[#FFFFFF]' : 'text-[#475467] hover:bg-[#F6F8FB]'
            }`}
          >
            <span>●</span> Anomalies
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full bg-[#F8FAFC] border-b border-[#E4E9F0] overflow-hidden" style={{ minHeight: '360px' }}>
        <svg
          viewBox="0 0 100 55"
          className="w-full h-auto max-h-[440px] select-none pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Lat / Lng Grid */}
          <line x1="0" y1="27.5" x2="100" y2="27.5" stroke="#E2E8F0" strokeWidth="0.3" strokeDasharray="1 1" />
          <line x1="50" y1="0" x2="50" y2="55" stroke="#E2E8F0" strokeWidth="0.3" strokeDasharray="1 1" />

          {/* Continents */}
          <path d="M 12,8 L 26,8 L 32,16 L 24,24 L 20,28 L 14,24 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 24,29 L 34,31 L 32,46 L 27,51 L 24,38 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 46,10 L 58,10 L 56,19 L 48,19 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 46,21 L 58,21 L 60,38 L 52,47 L 46,33 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 59,7 L 90,8 L 86,28 L 68,26 L 60,18 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
          <path d="M 80,36 L 93,36 L 90,48 L 78,46 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />

          {/* Subsea cable conduits illustrative routes */}
          <path d="M 28,15 Q 38,20 46,14" fill="none" stroke="#0E63C4" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.4" />
          <path d="M 54,18 Q 50,26 48,34" fill="none" stroke="#0E63C4" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.4" />
          <path d="M 56,19 Q 62,25 72,30" fill="none" stroke="#0E63C4" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.4" />
          <path d="M 72,30 Q 82,26 88,24" fill="none" stroke="#0E63C4" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.4" />
        </svg>

        {/* Markers with Strict 3-Shape Encoding */}
        <div className="absolute inset-0 pointer-events-auto">
          {filteredEvents.map((ev) => {
            const { x, y } = projectGlobalCoords(ev.lat, ev.lng);
            const isSelected = selectedEvent.id === ev.id;
            return (
              <div
                key={ev.id}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                onClick={() => setSelectedEvent(ev)}
              >
                <div
                  className={`relative flex items-center justify-center transition-transform ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                  }`}
                >
                  <span
                    className={`absolute w-7 h-7 rounded-full opacity-30 ${
                      ev.state === 'shutdown'
                        ? 'bg-[#B42318]'
                        : ev.state === 'outage'
                        ? 'bg-[#F04438]'
                        : 'bg-[#F79009]'
                    } ${isSelected ? 'animate-ping' : ''}`}
                  />

                  {/* Accessible Distinct Shapes: Circle (Anomaly), Triangle (Outage), Square (Shutdown) */}
                  {ev.state === 'anomaly' && (
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border-2 shadow-md ${
                        isSelected
                          ? 'bg-[#F79009] border-[#FFFFFF] text-[#FFFFFF]'
                          : 'bg-[#FFFFFF] border-[#F79009] text-[#F79009]'
                      }`}
                    >
                      <span className="text-[9px] font-bold">●</span>
                    </div>
                  )}

                  {ev.state === 'outage' && (
                    <div
                      className={`w-5 h-5 flex items-center justify-center border-2 shadow-md transform rotate-0 ${
                        isSelected
                          ? 'bg-[#F04438] border-[#FFFFFF] text-[#FFFFFF]'
                          : 'bg-[#FFFFFF] border-[#F04438] text-[#F04438]'
                      }`}
                      style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', width: '22px', height: '20px' }}
                    >
                      <span className="text-[8px] font-bold mt-1">▲</span>
                    </div>
                  )}

                  {ev.state === 'shutdown' && (
                    <div
                      className={`w-5 h-5 rounded-xs flex items-center justify-center border-2 shadow-md ${
                        isSelected
                          ? 'bg-[#B42318] border-[#FFFFFF] text-[#FFFFFF]'
                          : 'bg-[#FFFFFF] border-[#B42318] text-[#B42318]'
                      }`}
                    >
                      <span className="text-[9px] font-bold">■</span>
                    </div>
                  )}

                  {/* Badge */}
                  <div
                    className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold shadow-xs border pointer-events-none transition ${
                      isSelected
                        ? 'bg-[#101828] text-[#FFFFFF] border-[#101828]'
                        : 'bg-[#FFFFFF]/95 text-[#344054] border-[#E4E9F0]'
                    }`}
                  >
                    {ev.country} : -{ev.observedTrafficDropPct}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Outage Dossier */}
      <div className="p-5 bg-[#FFFFFF] border-t border-[#E4E9F0] grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-[#101828]">{selectedEvent.title}</h3>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded uppercase ${
                selectedEvent.state === 'shutdown'
                  ? 'bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]'
                  : selectedEvent.state === 'outage'
                  ? 'bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]'
                  : 'bg-[#FFFAEB] text-[#B54708] border border-[#FEDF89]'
              }`}
            >
              {selectedEvent.state === 'anomaly' && '● Anomaly (Single Source)'}
              {selectedEvent.state === 'outage' && '▲ Outage (Corroborated)'}
              {selectedEvent.state === 'shutdown' && '■ Shutdown (Mandated)'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                Traffic Reduction
              </span>
              <span className="text-base font-bold font-mono text-[#B42318]">
                -{selectedEvent.observedTrafficDropPct}%
              </span>
              <span className="text-[10px] text-[#667085] block mt-0.5 font-medium">From weekly baseline</span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                Corroboration
              </span>
              <span className="text-sm font-bold font-mono text-[#101828]">
                {selectedEvent.corroboratedSources.length} Sources
              </span>
              <span className="text-[10px] text-[#0E63C4] block mt-0.5 truncate" title={selectedEvent.corroboratedSources.join(', ')}>
                {selectedEvent.corroboratedSources[0]}
              </span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                Event Duration
              </span>
              <span className="text-xs font-bold font-mono text-[#101828] block mt-1">
                {selectedEvent.statusText}
              </span>
            </div>
          </div>
        </div>

        {/* Cause Attribution Dossier Column */}
        <div className="md:col-span-2 bg-[#F8FAFC] border border-[#E4E9F0] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101828]">
              <Info className="w-4 h-4 text-[#0E63C4]" />
              <span>Attributed Cause Statement (Separated from Telemetry)</span>
            </div>
            {selectedEvent.causeAssertion.hasStatedCause ? (
              <div className="text-xs text-[#344054] space-y-1">
                <p className="italic bg-[#FFFFFF] p-2 rounded border border-[#E4E9F0] text-[#101828]">
                  "{selectedEvent.causeAssertion.verbatimQuote}"
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#667085] pt-1">
                  <span>Source: {selectedEvent.causeAssertion.sourceName}</span>
                  {selectedEvent.causeAssertion.sourceUrl && (
                    <a
                      href={selectedEvent.causeAssertion.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0E63C4] hover:underline flex items-center gap-0.5"
                    >
                      Source Link <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-[#FFFFFF] p-2 rounded border border-[#E4E9F0] text-xs text-[#667085]">
                <em>No cause stated by upstream authority. Traffic telemetry proves disruption occurred, but does not identify origin.</em>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-[#E4E9F0] flex items-center justify-between text-xs text-[#667085]">
            <span>Lat: {selectedEvent.lat.toFixed(4)}°, Lng: {selectedEvent.lng.toFixed(4)}°</span>
            <span className="text-[#0E63C4] font-medium">{selectedEvent.eventTimestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
