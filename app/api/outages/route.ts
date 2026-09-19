import { NextResponse } from 'next/server';
import { SEED_OUTAGES } from '../../../lib/fallback-data';

export async function GET() {
  return NextResponse.json(SEED_OUTAGES);
}
