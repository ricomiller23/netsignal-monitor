import { describe, it, expect } from 'vitest';
import { determineOutageState, calculateEventDuration, sumModelledUsers, OutageEvent, Observation, CauseAssertion } from '../lib/causes';

describe('NETSIGNAL — Outage State & Cause Assertion Guard Tests', () => {
  const singleObs: Observation = {
    id: 'o1',
    sourceId: 'cloudflare',
    sourceName: 'Cloudflare Radar',
    metric: 'traffic_drop_pct',
    value: 50,
    observedAt: '2026-09-19T10:00:00Z',
    documentUrl: 'https://radar.cloudflare.com'
  };

  const secondObs: Observation = {
    id: 'o2',
    sourceId: 'ioda',
    sourceName: 'IODA',
    metric: 'reachability_pct',
    value: 45,
    observedAt: '2026-09-19T10:05:00Z',
    documentUrl: 'https://ioda.inetintel.cc.gatech.edu'
  };

  const shutdownCause: CauseAssertion = {
    id: 'c1',
    sourceId: 'netblocks',
    sourceName: 'NetBlocks',
    assertedCause: 'shutdown',
    assertedAt: '2026-09-19T10:10:00Z',
    verbatimQuote: 'Intentional telecom shutdown order verified',
    attribution: 'NetBlocks',
    documentUrl: 'https://netblocks.org'
  };

  it('keeps single observation classified strictly as Anomaly, not Outage', () => {
    const state = determineOutageState({ observations: [singleObs], causes: [] });
    expect(state).toBe('anomaly');
  });

  it('promotes to Outage when corroborated by 2+ independent sources', () => {
    const state = determineOutageState({ observations: [singleObs, secondObs], causes: [] });
    expect(state).toBe('outage');
  });

  it('classifies as Shutdown when an attributed shutdown assertion exists', () => {
    const state = determineOutageState({ observations: [singleObs], causes: [shutdownCause] });
    expect(state).toBe('shutdown');
  });

  it('strictly reports unknown duration for active ongoing events', () => {
    const ongoingEvt: OutageEvent = {
      id: 'e1',
      slug: 'active-evt',
      country: 'TestCountry',
      countryIso: 'TST',
      startedAt: '2026-09-19T10:00:00Z',
      endedAt: null,
      state: 'anomaly',
      observations: [singleObs],
      causes: []
    };
    const dur = calculateEventDuration(ongoingEvt);
    expect(dur.durationMinutes).toBeUndefined();
    expect(dur.label).toContain('ongoing — duration unknown');
  });

  it('strictly throws when attempting to sum modelled users affected across events', () => {
    expect(() => sumModelledUsers([])).toThrow(/Summing 'users affected'.*is strictly prohibited/);
  });
});
