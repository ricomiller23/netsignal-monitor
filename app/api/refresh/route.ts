import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const auth = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'dev_secret';
  if (!auth || auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ ok: true, refreshed: true, timestamp: new Date().toISOString() });
}

export async function GET(req: Request) {
  return POST(req);
}
