import { createClient } from "@supabase/supabase-js";

const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (!arg.startsWith("--")) continue;

  const [rawKey, inlineValue] = arg.slice(2).split("=");
  const nextValue = process.argv[i + 1];
  const value =
    inlineValue ??
    (nextValue && !nextValue.startsWith("--") ? process.argv[++i] : "true");

  args.set(rawKey, value);
}

if (args.has("help") || args.has("h")) {
  console.log(`
Create Supabase Auth test users.

Usage:
  SUPABASE_URL="https://PROJECT_ID.supabase.co" \\
  SUPABASE_SERVICE_ROLE_KEY="SERVICE_ROLE_KEY" \\
  npm run create:test-users -- --count 50

Options:
  --count <number>     Number of users to create. Default: 50
  --start <number>     First user number. Default: 1
  --prefix <text>      Email prefix. Default: testuser
  --domain <domain>    Email domain. Default: budgetassist.test
  --password <text>    Password for all users. Default: TestUser!2026
  --dry-run            Print users without creating them
`);
  process.exit(0);
}

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const count = Number(args.get("count") ?? 50);
const start = Number(args.get("start") ?? 1);
const prefix = args.get("prefix") ?? "testuser";
const domain = args.get("domain") ?? "budgetassist.test";
const password =
  args.get("password") ?? process.env.TEST_USER_PASSWORD ?? "TestUser!2026";
const dryRun = args.has("dry-run");

if (!Number.isInteger(count) || count < 1) {
  console.error("ERROR: --count must be a positive integer.");
  process.exit(1);
}

if (!Number.isInteger(start) || start < 1) {
  console.error("ERROR: --start must be a positive integer.");
  process.exit(1);
}

if (!dryRun && (!supabaseUrl || !serviceRoleKey)) {
  console.error(
    "ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.",
  );
  console.error("Run with --help to see an example.");
  process.exit(1);
}

const supabase = dryRun ? null : createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

let created = 0;
let skipped = 0;
let failed = 0;

for (let offset = 0; offset < count; offset += 1) {
  const index = start + offset;
  const padded = String(index).padStart(2, "0");
  const email = `${prefix}${padded}@${domain}`;
  const displayName = `Beta Test User ${padded}`;

  if (dryRun) {
    console.log(`[dry-run] ${email} / ${displayName}`);
    continue;
  }

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      display_name: displayName,
      role: "beta-test-user",
      generated_for: "BudgetAssist beta test",
    },
  });

  if (!error) {
    created += 1;
    console.log(`created: ${email}`);
    continue;
  }

  if (
    error.message.toLowerCase().includes("already") ||
    error.message.toLowerCase().includes("registered")
  ) {
    skipped += 1;
    console.log(`skipped existing: ${email}`);
    continue;
  }

  failed += 1;
  console.error(`failed: ${email} - ${error.message}`);
}

console.log("");
console.log(`Done. Created: ${created}, skipped: ${skipped}, failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
}
