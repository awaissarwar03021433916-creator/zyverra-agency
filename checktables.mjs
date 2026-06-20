import pg from 'pg';
const { Client } = pg;
const url = process.env.DATABASE_URL;
const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
const res = await client.query(
  `SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`
);
const u = new URL(url);
console.log("HOST:", u.host);
console.log("DB:", u.pathname);
console.log("TABLES:", res.rows.map((r) => r.table_name).join(", ") || "(none)");
await client.end();
