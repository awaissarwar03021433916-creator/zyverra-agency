// Generate an ADMIN_PASSWORD_HASH for production.
//
// The output format and algorithm match src/server/auth/password.ts exactly:
//   scrypt$<saltHex>$<hashHex>   (16-byte random salt, scrypt key length 64)
// so the value verifies via verifyAdminPassword() without any code change.
//
// The password is read from stdin or the ADMIN_PW env var (NOT a CLI argument)
// so it never lands in your shell history. Usage examples are in the docs/output.

import crypto from "node:crypto";
import { stdin } from "node:process";

const KEYLEN = 64; // must match SCRYPT_KEYLEN in src/server/auth/password.ts
const MIN_LENGTH = 16; // refuse weak passwords — do not weaken security

function hashPassword(plain) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(plain, salt, KEYLEN);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

// Round-trip check using the same logic the app uses to verify at login.
function verify(plain, stored) {
  const [scheme, saltHex, hashHex] = stored.split("$");
  if (scheme !== "scrypt") return false;
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const actual = crypto.scryptSync(plain, salt, expected.length);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

async function readStdin() {
  if (stdin.isTTY) return "";
  let data = "";
  stdin.setEncoding("utf8");
  for await (const chunk of stdin) data += chunk;
  return data;
}

const fromEnv = process.env.ADMIN_PW;
let password = fromEnv ?? (await readStdin());
// Strip a single trailing newline (from piping/echo); keep all other characters.
password = (password ?? "").replace(/\r?\n$/, "");

if (!password) {
  console.error(
    "No password provided.\n" +
      "  PowerShell:  $env:ADMIN_PW='YourStrongPassword'; node scripts/hash-admin-password.mjs; Remove-Item Env:ADMIN_PW\n" +
      "  Bash:        ADMIN_PW='YourStrongPassword' node scripts/hash-admin-password.mjs"
  );
  process.exit(1);
}

if (password.length < MIN_LENGTH) {
  console.error(`Refusing: password is ${password.length} chars; use at least ${MIN_LENGTH}.`);
  process.exit(1);
}

const hash = hashPassword(password);
if (!verify(password, hash)) {
  console.error("Self-verification failed — not emitting hash.");
  process.exit(1);
}

console.log(hash);
