import postgres from 'postgres';

// Supabase Postgres connection via postgres.js.
//
// A single client is reused per runtime instance (cached on globalThis so it
// survives dev hot-reloads) to avoid exhausting the Supabase pooler across warm
// serverless invocations.
const globalForDb = globalThis as unknown as { __sql?: ReturnType<typeof postgres> };

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  if (!globalForDb.__sql) {
    globalForDb.__sql = postgres(url, {
      // Supabase's transaction pooler (port 6543 / pgBouncer) does not support
      // prepared statements — this MUST stay false or queries error out.
      prepare: false,
      ssl: 'require',
      max: 1,            // one connection per serverless instance
      idle_timeout: 20,  // seconds
      connect_timeout: 15,
    });
  }
  return globalForDb.__sql;
}
