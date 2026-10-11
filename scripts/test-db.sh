#!/usr/bin/env bash
set -euo pipefail

: "${TEST_DATABASE_URL:?Set TEST_DATABASE_URL to a disposable, empty PostgreSQL test database.}"
command -v psql >/dev/null || { echo 'psql is required for database tests.' >&2; exit 1; }
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
test_workspace="$(mktemp -d)"
trap 'rm -rf "$test_workspace"' EXIT
mkdir -p "$test_workspace/tests"
cp "$repo_root/supabase/schema.sql" "$test_workspace/schema.sql"
cp "$repo_root/supabase/tests/profile-permissions.sql" "$test_workspace/tests/"
# Keep the upgrade inside the regression suite's rollback transaction.
sed '/^begin;$/d; /^commit;$/d' \
  "$repo_root/supabase/migrations/202610100001_harden_profile_permissions.sql" \
  > "$test_workspace/tests/profile-upgrade-under-test.sql"
for scenario in fresh upgrade; do
  echo "Testing profile permissions: $scenario"
  if [ "$scenario" = upgrade ]; then
    cp "$repo_root/supabase/tests/legacy-profile-permissions.sql" "$test_workspace/tests/profile-legacy-under-test.sql"
  else
    : > "$test_workspace/tests/profile-legacy-under-test.sql"
  fi
  psql --dbname "$TEST_DATABASE_URL" --no-psqlrc --set ON_ERROR_STOP=1 --file "$test_workspace/tests/profile-permissions.sql"
done
