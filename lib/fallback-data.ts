import { OutageEvent } from './causes';

export const SEED_OUTAGES: OutageEvent[] = [
  {
    id: 'outage-honduras-power-2026',
    slug: 'honduras-nationwide-power-outage-2026',
    country: 'Honduras',
    countryIso: 'HND',
    startedAt: '2026-09-10T14:20:00Z',
    endedAt: '2026-09-14T18:00:00Z',
    state: 'resolved',
    severityScore: 84,
    observations: [
      {
        id: 'obs-hnd-1',
        sourceId: 'cloudflare-radar',
        sourceName: 'Cloudflare Radar',
        metric: 'traffic_drop_pct',
        value: 78,
        observedAt: '2026-09-10T14:30:00Z',
        baselineNote: '78% drop against trailing 7-day average',
        documentUrl: 'https://radar.cloudflare.com/outage-center'
      },
      {
        id: 'obs-hnd-2',
        sourceId: 'ioda',
        sourceName: 'IODA',
        metric: 'reachability_pct',
        value: 22,
        observedAt: '2026-09-10T14:35:00Z',
        baselineNote: 'Active probing and BGP drop observed',
        documentUrl: 'https://ioda.inetintel.cc.gatech.edu/'
      }
    ],
    causes: [
      {
        id: 'cause-hnd-1',
        sourceId: 'cloudflare-radar',
        sourceName: 'Cloudflare Radar',
        assertedCause: 'power',
        assertedAt: '2026-09-10T16:00:00Z',
        verbatimQuote: 'Widespread electrical transmission failure across the National Interconnected System (SIN).',
        attribution: 'ENEE (Empresa Nacional de Energía Eléctrica)',
        documentUrl: 'https://radar.cloudflare.com/outage-center'
      }
    ],
    modelledUsersAffected: 6200000,
    isSeed: true
  },
  {
    id: 'outage-iberia-natural-2026',
    slug: 'spain-portugal-traffic-anomaly-2026',
    country: 'Spain & Portugal',
    countryIso: 'ESP',
    region: 'Iberian Peninsula',
    startedAt: '2026-08-12T10:15:00Z',
    endedAt: '2026-08-12T16:45:00Z',
    state: 'resolved',
    severityScore: 42,
    observations: [
      {
        id: 'obs-esp-1',
        sourceId: 'cloudflare-radar',
        sourceName: 'Cloudflare Radar',
        metric: 'traffic_drop_pct',
        value: 48,
        observedAt: '2026-08-12T10:30:00Z',
        baselineNote: '48% drop on regional IXPs',
        documentUrl: 'https://radar.cloudflare.com/outage-center'
      }
    ],
    causes: [], // Cause intentionally unstated by source
    isSeed: true
  },
  {
    id: 'outage-ongoing-anomaly-2026',
    slug: 'regional-routing-anomaly-active',
    country: 'Central Asian Transit',
    countryIso: 'UZB',
    startedAt: '2026-09-19T11:00:00Z',
    endedAt: null, // Ongoing!
    state: 'anomaly',
    severityScore: 28,
    observations: [
      {
        id: 'obs-uzb-1',
        sourceId: 'ioda',
        sourceName: 'IODA',
        metric: 'bgp_withdrawals',
        value: 140,
        observedAt: '2026-09-19T11:15:00Z',
        baselineNote: 'Prefix withdrawal anomaly detected on AS42610',
        documentUrl: 'https://ioda.inetintel.cc.gatech.edu/'
      }
    ],
    causes: [],
    isSeed: true
  },
  {
    id: 'outage-deliberate-shutdown-2026',
    slug: 'sub-saharan-election-shutdown',
    country: 'Regional Disturbance',
    countryIso: 'CMR',
    startedAt: '2026-09-18T06:00:00Z',
    endedAt: null, // Ongoing!
    state: 'shutdown',
    severityScore: 92,
    observations: [
      {
        id: 'obs-cmr-1',
        sourceId: 'cloudflare-radar',
        sourceName: 'Cloudflare Radar',
        metric: 'traffic_drop_pct',
        value: 94,
        observedAt: '2026-09-18T06:15:00Z',
        baselineNote: 'National-scale connectivity collapsed to near zero',
        documentUrl: 'https://radar.cloudflare.com/outage-center'
      },
      {
        id: 'obs-cmr-2',
        sourceId: 'netblocks',
        sourceName: 'NetBlocks',
        metric: 'traffic_drop_pct',
        value: 95,
        observedAt: '2026-09-18T06:20:00Z',
        baselineNote: 'Targeted national telecom shutdown',
        documentUrl: 'https://netblocks.org/'
      }
    ],
    causes: [
      {
        id: 'cause-cmr-1',
        sourceId: 'netblocks',
        sourceName: 'NetBlocks',
        assertedCause: 'shutdown',
        assertedAt: '2026-09-18T07:00:00Z',
        verbatimQuote: 'Network metrics confirm a nation-scale disruption to internet connectivity consistent with an intentional curfew-linked shutdown order.',
        attribution: 'NetBlocks Civil Society Telemetry',
        documentUrl: 'https://netblocks.org/'
      }
    ],
    isSeed: true
  }
];
