import { OutageEvent } from './causes';

export interface GlobalNetworkHealth {
  activeDisruptionsCount: number;
  corroboratedOutagesCount: number;
  attributedShutdownsCount: number;
  bgpWithdrawnPrefixesCount: number;
  globalTrafficIndex: number;
  iodaMonitoredAsns: number;
}

export const SEED_NETWORK_HEALTH: GlobalNetworkHealth = {
  activeDisruptionsCount: 4,
  corroboratedOutagesCount: 2,
  attributedShutdownsCount: 1,
  bgpWithdrawnPrefixesCount: 140,
  globalTrafficIndex: 99.8,
  iodaMonitoredAsns: 1250
};

export const SEED_OUTAGES: OutageEvent[] = [
  {
    id: 'outage-honduras-power-2026',
    slug: 'honduras-nationwide-power-outage-2026',
    country: 'Honduras',
    countryIso: 'HND',
    region: 'National Grid',
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
        baselineNote: '78% traffic drop against trailing 7-day baseline',
        documentUrl: 'https://radar.cloudflare.com/outage-center'
      },
      {
        id: 'obs-hnd-2',
        sourceId: 'ioda',
        sourceName: 'IODA (Georgia Tech)',
        metric: 'reachability_pct',
        value: 22,
        observedAt: '2026-09-10T14:35:00Z',
        baselineNote: 'Telescope darknet probe collapse & BGP withdrawal',
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
        verbatimQuote: 'Widespread electrical transmission failure across the National Interconnected System (SIN) following a transformer substation fire.',
        attribution: 'ENEE (Empresa Nacional de Energía Eléctrica)',
        documentUrl: 'https://radar.cloudflare.com/outage-center'
      }
    ],
    modelledUsersAffected: 6200000,
    isSeed: true
  },
  {
    id: 'outage-deliberate-shutdown-2026',
    slug: 'sub-saharan-election-shutdown',
    country: 'Cameroon',
    countryIso: 'CMR',
    region: 'Northwest & Southwest Regions',
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
        baselineNote: 'Cellular and fixed-line connectivity collapsed to near zero',
        documentUrl: 'https://radar.cloudflare.com/outage-center'
      },
      {
        id: 'obs-cmr-2',
        sourceId: 'netblocks',
        sourceName: 'NetBlocks',
        metric: 'traffic_drop_pct',
        value: 95,
        observedAt: '2026-09-18T06:20:00Z',
        baselineNote: 'National-scale telecommunications blackout confirmed',
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
        verbatimQuote: 'Network metrics confirm a nation-scale disruption to internet connectivity consistent with an intentional curfew-linked shutdown directive issued ahead of regional elections.',
        attribution: 'NetBlocks Civil Society Telemetry',
        documentUrl: 'https://netblocks.org/'
      }
    ],
    modelledUsersAffected: 4800000,
    isSeed: true
  },
  {
    id: 'outage-iberia-natural-2026',
    slug: 'spain-portugal-traffic-anomaly-2026',
    country: 'Spain & Portugal',
    countryIso: 'ESP',
    region: 'Iberian IXP Transit',
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
        baselineNote: '48% traffic drop on regional transit exchanges',
        documentUrl: 'https://radar.cloudflare.com/outage-center'
      }
    ],
    causes: [], // Cause intentionally unstated by source
    isSeed: true
  },
  {
    id: 'outage-ongoing-anomaly-2026',
    slug: 'regional-routing-anomaly-active',
    country: 'Uzbekistan',
    countryIso: 'UZB',
    region: 'Tashkent Exchange',
    startedAt: '2026-09-19T11:00:00Z',
    endedAt: null, // Ongoing!
    state: 'anomaly',
    severityScore: 28,
    observations: [
      {
        id: 'obs-uzb-1',
        sourceId: 'ioda',
        sourceName: 'IODA (Georgia Tech)',
        metric: 'bgp_withdrawals',
        value: 140,
        observedAt: '2026-09-19T11:15:00Z',
        baselineNote: '140 prefix withdrawals detected on AS42610 within 5 minutes',
        documentUrl: 'https://ioda.inetintel.cc.gatech.edu/'
      }
    ],
    causes: [], // Uncorroborated single source
    isSeed: true
  },
  {
    id: 'outage-redsea-subsea-cable-2026',
    slug: 'red-sea-subsea-cable-cut',
    country: 'Red Sea Corridor',
    countryIso: 'YEM',
    region: 'Bab el-Mandeb Subsea Cables',
    startedAt: '2026-07-24T03:00:00Z',
    endedAt: '2026-07-28T12:00:00Z',
    state: 'resolved',
    severityScore: 76,
    observations: [
      {
        id: 'obs-yem-1',
        sourceId: 'cloudflare-radar',
        sourceName: 'Cloudflare Radar',
        metric: 'traffic_drop_pct',
        value: 62,
        observedAt: '2026-07-24T03:15:00Z',
        baselineNote: '62% latency spike and packet loss across East Africa transit',
        documentUrl: 'https://radar.cloudflare.com/outage-center'
      },
      {
        id: 'obs-yem-2',
        sourceId: 'ioda',
        sourceName: 'IODA',
        metric: 'reachability_pct',
        value: 38,
        observedAt: '2026-07-24T03:30:00Z',
        baselineNote: 'Transit route rerouting around Cape of Good Hope observed',
        documentUrl: 'https://ioda.inetintel.cc.gatech.edu/'
      }
    ],
    causes: [
      {
        id: 'cause-yem-1',
        sourceId: 'cloudflare-radar',
        sourceName: 'Cloudflare Radar',
        assertedCause: 'cable',
        assertedAt: '2026-07-24T08:00:00Z',
        verbatimQuote: 'Physical anchor drag damage confirmed on Seacom and AAE-1 submarine fiber optic cables in southern Red Sea.',
        attribution: 'Seacom Consortium Engineering Notice',
        documentUrl: 'https://radar.cloudflare.com/outage-center'
      }
    ],
    isSeed: true
  }
];
