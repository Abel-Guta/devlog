import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode');

  if (mode === '400') {
    return NextResponse.json({ error: 'Missing required param' }, { status: 400 });
  }
  if (mode === '500') {
    throw new Error('Simulated server failure');
  }
  return NextResponse.json({ ok: true });
}