import { test } from "node:test"
import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"
const script = fileURLToPath(
  new URL("../create-test-users.mjs", import.meta.url),
)
const run = (args = [], env = {}) =>
  spawnSync(process.execPath, [script, ...args], {
    encoding: "utf8",
    env: { PATH: process.env.PATH, ...env },
    timeout: 5000,
  })
const target = {
  SUPABASE_URL: "http://127.0.0.1:1",
  SUPABASE_SERVICE_ROLE_KEY: "test-only-key",
}
test("dry run works without credentials and does not create accounts", () => {
  const result = run(["--dry-run", "--count", "2"])
  assert.equal(result.status, 0)
  assert.match(result.stdout, /testuser01@budgetassist.test/)
  assert.match(result.stdout, /testuser02@budgetassist.test/)
  assert.match(result.stdout, /Created: 0/)
})
test("creation requires an explicit target and server credential", () => {
  const result = run()
  assert.equal(result.status, 1)
  assert.match(
    result.stderr,
    /SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required/,
  )
})
test("creation refuses missing or short passwords before any request", () => {
  for (const password of [undefined, "short"]) {
    const result = run([], {
      ...target,
      ...(password ? { TEST_USER_PASSWORD: password } : {}),
    })
    assert.equal(result.status, 1)
    assert.match(result.stderr, /TEST_USER_PASSWORD is required/)
  }
})
test("command-line passwords are rejected without echoing them", () => {
  const secret = "never-print-this-test-password"
  const result = run(["--password", secret])
  assert.equal(result.status, 1)
  assert.match(result.stderr, /environment/)
  assert.ok(!(result.stdout + result.stderr).includes(secret))
})
test("invalid targets and embedded credentials fail without disclosure", () => {
  for (const url of [
    "invalid",
    "file:///tmp/test",
    "https://user:secret@example.test",
    "https://example.test/path",
  ]) {
    const result = run([], {
      ...target,
      SUPABASE_URL: url,
      TEST_USER_PASSWORD: "test-only-long-password",
    })
    assert.equal(result.status, 1)
    assert.match(result.stderr, /SUPABASE_URL must be/)
    assert.ok(!(result.stdout + result.stderr).includes(url))
  }
})
test("invalid account counts fail even in dry run", () => {
  for (const count of ["0", "-1", "abc", "1.5"]) {
    const result = run(["--dry-run", "--count", count])
    assert.equal(result.status, 1)
    assert.match(result.stderr, /count must be a positive integer/)
  }
})
