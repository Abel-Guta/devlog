'use client';
import { useState } from 'react';

export default function NotesClient() {
  const [text, setText] = useState('');
  const [log, setLog] = useState('');

  async function call(method: string, body?: any) {
    const res = await fetch('/api/notes', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => null);
    setLog(`${method} → ${res.status}: ${JSON.stringify(data)}`);
  }

  return (
    <div className="space-y-2 p-4">
      <input value={text} onChange={e => setText(e.target.value)} className="border p-1" />
      <div className="flex gap-2">
        <button onClick={() => call('GET')}>GET</button>
        <button onClick={() => call('POST', { text })}>POST</button>
        <button onClick={() => call('PUT', { id: 1, text })}>PUT</button>
        <button onClick={() => call('DELETE', { id: 1 })}>DELETE</button>
      </div>
      <pre>{log}</pre>
    </div>
  );
}