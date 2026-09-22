import { NextResponse } from 'next/server';

let notes: { id: number; text: string }[] = [
  { id: 1, text: 'First note' },
];

export async function GET() {
  const res = NextResponse.json({ notes });
  res.headers.set('X-Devlog-Source', 'route-handler'); // custom header, step 5
  return res;
}

export async function POST(request: Request) {
  const body = await request.json();
  const newNote = { id: Date.now(), text: body.text };
  notes.push(newNote);
  return NextResponse.json({ note: newNote }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  notes = notes.map(n => (n.id === body.id ? { ...n, text: body.text } : n));
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  notes = notes.filter(n => n.id !== id);
  return NextResponse.json({ ok: true });
}