import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    product: 'NETSIGNAL',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    connectors: {
      cloudflare_radar: 'ok',
      ioda: 'ok',
      netblocks: 'ok'
    }
  });
}
