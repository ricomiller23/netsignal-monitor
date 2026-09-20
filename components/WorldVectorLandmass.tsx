'use client';

import React from 'react';
import { WORLD_LANDMASS_PATH } from './WorldVectorPaths';

export interface WorldVectorLandmassProps {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  showGraticule?: boolean;
  showLabels?: boolean;
}

export function WorldVectorLandmass({
  fill = "#E2E8F0",
  stroke = "#CBD5E1",
  strokeWidth = 0.75,
  showGraticule = true,
  showLabels = true,
}: WorldVectorLandmassProps) {
  return (
    <g className="world-vector-landmass pointer-events-none select-none">
      {/* Soft Water Base */}
      <rect width="1000" height="500" fill="#EEF4FB" />

      {/* Graticule Lines */}
      {showGraticule && (
        <g stroke="#DCE6F1" strokeWidth="0.6" strokeDasharray="3,3">
          {/* Latitudes */}
          <line x1="0" y1="84.5" x2="1000" y2="84.5" />
          <line x1="0" y1="190.1" x2="1000" y2="190.1" />
          <line x1="0" y1="295.8" x2="1000" y2="295.8" stroke="#CBD5E1" strokeDasharray="4,4" />
          <line x1="0" y1="401.4" x2="1000" y2="401.4" />

          {/* Longitudes */}
          <line x1="166.7" y1="0" x2="166.7" y2="500" />
          <line x1="333.3" y1="0" x2="333.3" y2="500" />
          <line x1="500" y1="0" x2="500" y2="500" stroke="#CBD5E1" strokeDasharray="4,4" />
          <line x1="666.7" y1="0" x2="666.7" y2="500" />
          <line x1="833.3" y1="0" x2="833.3" y2="500" />
        </g>
      )}

      {/* Actual World Landmass Vector */}
      <path
        d={WORLD_LANDMASS_PATH}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />

      {/* Cartographic Monospace Labels */}
      {showLabels && (
        <g fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="600" opacity="0.8">
          {/* Graticule Markings */}
          <text x="12" y="292">EQUATOR 0°</text>
          <text x="12" y="186">30°N</text>
          <text x="12" y="80">60°N</text>
          <text x="504" y="20">0°</text>

          {/* Oceans */}
          <text x="80" y="240" letterSpacing="2">NORTH PACIFIC</text>
          <text x="160" y="440" letterSpacing="2">SOUTH PACIFIC</text>
          <text x="350" y="210" letterSpacing="2">NORTH ATLANTIC</text>
          <text x="410" y="420" letterSpacing="2">SOUTH ATLANTIC</text>
          <text x="680" y="380" letterSpacing="2">INDIAN OCEAN</text>
          <text x="460" y="45" letterSpacing="3">ARCTIC OCEAN</text>

          {/* Continents */}
          <text x="200" y="140" fill="#64748B" fontSize="9.5" letterSpacing="1.5">NORTH AMERICA</text>
          <text x="320" y="350" fill="#64748B" fontSize="9.5" letterSpacing="1.5">SOUTH AMERICA</text>
          <text x="515" y="125" fill="#64748B" fontSize="9.5" letterSpacing="1.5">EUROPE</text>
          <text x="525" y="280" fill="#64748B" fontSize="9.5" letterSpacing="1.5">AFRICA</text>
          <text x="730" y="150" fill="#64748B" fontSize="9.5" letterSpacing="1.5">ASIA</text>
          <text x="830" y="380" fill="#64748B" fontSize="9.5" letterSpacing="1.5">AUSTRALIA</text>
        </g>
      )}
    </g>
  );
}
