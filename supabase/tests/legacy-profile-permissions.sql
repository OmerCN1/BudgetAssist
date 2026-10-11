-- TEST FIXTURE ONLY: recreate the vulnerable pre-upgrade profile permissions.
-- The regression runner applies the security migration immediately afterward.
drop policy if exists "Users can read their own profiles" on public.profiles;
drop policy if exists "Users can insert their own profiles" on public.profiles;
drop policy if exists "Users can update their own profiles" on public.profiles;
drop policy if exists "Users can write their own profiles" on public.profiles;
create policy "Users can write their own profiles" on public.profiles
for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
grant all on public.profiles to authenticated, anon;
create or replace function public.protect_profile_admin_fields()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (old.role is distinct from new.role or old.is_banned is distinct from new.is_banned)
     and not (select public.is_admin()) then
    raise exception 'Protected profile fields cannot be updated by this user';
  end if;
  return new;
end;
$$;
drop trigger if exists protect_profile_admin_fields_trigger on public.profiles;
create trigger protect_profile_admin_fields_trigger
before update on public.profiles for each row
execute function public.protect_profile_admin_fields();
