# Security and demo scope

BudgetAssist is an educational project, not a production financial service. Use synthetic data and a dedicated test Supabase project. No security certification, uptime commitment, or response-time guarantee is provided.

## Reporting a vulnerability

If GitHub's **Security → Report a vulnerability** option is enabled for this repository, use that private channel. If it is unavailable, open an Issue asking the maintainer to establish a private reporting channel **without including exploit details or sensitive data**. Do not publish passwords, access tokens, real financial records, or other people's personal information.

Only test systems you own or have explicit permission to assess. A public source-code license is not permission to attack a hosted deployment.

## Profile permission update — October 10, 2026

Existing installations must apply [`supabase/migrations/202610100001_harden_profile_permissions.sql`](supabase/migrations/202610100001_harden_profile_permissions.sql) using the Supabase SQL Editor or an authorized database connection. Fresh installations use the updated [`supabase/schema.sql`](supabase/schema.sql).

The update prevents authenticated users from inserting privileged profiles, changing protected profile fields, or deleting and recreating their profile. It preserves ordinary profile editing and authorized admin RPCs. Repository changes do **not** automatically update a deployed database.

Review existing `profiles.role` values against your intended administrator list: this patch prevents future privilege escalation but cannot determine whether a previously assigned administrator was legitimate. Review existing test accounts too; rotate or remove any accounts created with an older shared default password before exposing the test project.

The regression suite runs against an isolated PostgreSQL database and checks actual RLS, trigger, and RPC behavior. Run it using the instructions in [README.md](README.md#database-permission-tests).

## Administrator bootstrap

In a database you control, use the Supabase SQL Editor as its trusted owner to promote a known, existing profile. Verify the user ID before running the update:

```sql
update public.profiles
set role = 'admin'
where user_id = '<your-verified-user-uuid>';
```

Keep database-owner and service-role credentials server-side. Do not place them in any `VITE_*` variable or commit them to the repository.
