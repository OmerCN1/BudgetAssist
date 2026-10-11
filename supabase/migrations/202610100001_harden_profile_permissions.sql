-- Upgrade an existing BudgetAssist database. Fresh installs use schema.sql.
begin;

-- Protected fields must also be checked on INSERT. Keep this function INVOKER
-- so current_user is the calling database role, not the function owner.
create or replace function public.protect_profile_admin_fields()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  -- Trusted SQL maintenance and server-side service-role operations.
  if current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.role is distinct from 'user' or new.is_banned is distinct from false then
      raise exception 'New profiles must start as unbanned users' using errcode = '42501';
    end if;
  else
    if new.user_id is distinct from old.user_id or new.id is distinct from old.id then
      raise exception 'Profile identity cannot be changed' using errcode = '42501';
    end if;
    if (old.role is distinct from new.role or old.is_banned is distinct from new.is_banned)
       and not (select public.is_admin()) then
      raise exception 'Protected profile fields cannot be updated by this user' using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_admin_fields_trigger on public.profiles;
create trigger protect_profile_admin_fields_trigger
before insert or update on public.profiles
for each row execute function public.protect_profile_admin_fields();

-- Separate operations: a user may create a normal profile and edit their own
-- settings, but cannot delete/recreate the row to reset a ban or gain a role.
drop policy if exists "Users can manage their own profiles" on public.profiles;
drop policy if exists "Users can write their own profiles" on public.profiles;
drop policy if exists "Users can read their own profiles" on public.profiles;
drop policy if exists "Users can insert their own profiles" on public.profiles;
drop policy if exists "Users can update their own profiles" on public.profiles;

create policy "Users can read their own profiles"
on public.profiles for select to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert their own profiles"
on public.profiles for insert to authenticated
with check ((select auth.uid()) = user_id and role = 'user' and is_banned = false);

create policy "Users can update their own profiles"
on public.profiles for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

revoke all on public.profiles from anon;
revoke delete, truncate, references, trigger on public.profiles from authenticated;
grant select, insert, update on public.profiles to authenticated;

commit;
