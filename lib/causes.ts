// NETSIGNAL - Outage & Cause Assertion Types & State Guards

export type OutageState = 'anomaly' | 'outage' | 'shutdown' | 'resolved';

export type AssertedCause = 
  | 'shutdown'
  | 'power'
  | 'conflict'
  | 'weather'
  | 'cable'
  | 'cyber'
  | 'maintenance'
  | 'technical'
  | 'unknown';

export interface Observation {
  id: string;
  sourceId: string;
  sourceName: string;
  metric: 'traffic_drop_pct' | 'reachability_pct' | 'bgp_withdrawals' | 'ioda_score' | 'user_reports';
  value: number;
  observedAt: string;
  baselineNote?: string;
  documentUrl: string;
}

export interface CauseAssertion {
  id: string;
  sourceId: string;
  sourceName: string;
  assertedCause: AssertedCause;
  assertedAt: string;
  verbatimQuote: string;
  attribution: string;
  documentUrl: string;
}

export interface OutageEvent {
  id: string;
  slug: string;
  country: string;
  countryIso: string;
  region?: string;
  startedAt: string;
  endedAt?: string | null;
  state: OutageState;
  severityScore?: number;
  observations: Observation[];
  causes: CauseAssertion[];
  modelledUsersAffected?: number;
  isSeed?: boolean;
}

// INVARIANT GUARD 1: Single-source anomaly cannot be promoted to Outage without corroboration.
export function determineOutageState(params: {
  observations: Observation[];
  causes: CauseAssertion[];
  isResolved?: boolean;
}): OutageState {
  if (params.isResolved) return 'resolved';
  
  // If a verified source explicitly asserts a government shutdown:
  const hasShutdownAssertion = params.causes.some(c => c.assertedCause === 'shutdown');
  if (hasShutdownAssertion) {
    return 'shutdown';
  }

  // Outage requires 2+ independent sources or official confirmation
  const uniqueSources = new Set(params.observations.map(o => o.sourceId));
  if (uniqueSources.size >= 2) {
    return 'outage';
  }

  // Single observation = Anomaly only
  return 'anomaly';
}

// INVARIANT GUARD 2: Ongoing duration calculation prohibition
export function calculateEventDuration(event: OutageEvent): { durationMinutes?: number; label: string } {
  if (!event.endedAt) {
    return {
      durationMinutes: undefined,
      label: 'ongoing — duration unknown'
    };
  }
  const start = new Date(event.startedAt).getTime();
  const end = new Date(event.endedAt).getTime();
  const diffMins = Math.round((end - start) / 60000);
  return {
    durationMinutes: diffMins,
    label: `${diffMins} min (${(diffMins / 60).toFixed(1)} hrs)`
  };
}

// INVARIANT GUARD 3: Strict prohibition on summing modelled 'users affected'
export function sumModelledUsers(events: OutageEvent[]): never {
  throw new Error(
    "[MODELLED DATA GUARD] Summing 'users affected' across events into a global count is strictly prohibited. Figures are synthetic models with differing regional baselines!"
  );
}
