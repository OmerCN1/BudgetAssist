-- Run only in a disposable, empty PostgreSQL database as postgres.
-- This is a real RLS/trigger regression suite, with minimal Supabase auth/storage
-- fixtures. It never connects to a hosted Supabase project. Everything rolls back.
\set ON_ERROR_STOP on
begin;
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
create schema auth;
create table auth.users (id uuid primary key, email text);
create function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;
grant usage on schema auth to authenticated, anon;
create schema storage;
create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
create table storage.objects (id uuid primary key, bucket_id text, name text);
create function storage.foldername(text) returns text[] language sql immutable as $$
  select string_to_array($1, '/')
$$;
alter default privileges in schema public grant all on tables to authenticated, anon, service_role;
\ir ../schema.sql
\ir profile-legacy-under-test.sql
-- The upgrade must also be safe to apply repeatedly to the current schema.
-- Its transaction wrapper is omitted by the runner, to keep this suite atomic.
\ir profile-upgrade-under-test.sql
\ir profile-upgrade-under-test.sql

insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-000000000001', 'first@example.test'),
  ('00000000-0000-0000-0000-000000000002', 'other@example.test'),
  ('00000000-0000-0000-0000-000000000003', 'admin@example.test'),
  ('00000000-0000-0000-0000-000000000004', 'banned@example.test');
insert into public.profiles (user_id, role, is_banned) values
  ('00000000-0000-0000-0000-000000000002', 'user', false),
  ('00000000-0000-0000-0000-000000000003', 'admin', false),
  ('00000000-0000-0000-0000-000000000004', 'user', true);

set local role authenticated;
set local request.jwt.claim.sub = '00000000-0000-0000-0000-000000000001';
do $$ begin
  begin
    insert into public.profiles (user_id, role) values (auth.uid(), 'admin');
    raise exception 'FAIL: user created an admin profile';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.profiles (user_id, is_banned) values (auth.uid(), true);
    raise exception 'FAIL: user controlled initial ban field';
  exception when insufficient_privilege then null; end;
  insert into public.profiles (user_id, display_name) values (auth.uid(), 'Normal user');
  update public.profiles set display_name = 'Updated name' where user_id = auth.uid();
  if not exists (select from public.profiles where user_id = auth.uid() and display_name = 'Updated name' and role = 'user') then
    raise exception 'FAIL: ordinary profile create/update failed';
  end if;
  if (select count(*) from public.profiles) <> 1 then
    raise exception 'FAIL: user can read another profile';
  end if;
  begin
    update public.profiles set role = 'admin' where user_id = auth.uid();
    raise exception 'FAIL: self-promotion allowed';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.profiles (user_id, role) values (auth.uid(), 'admin')
      on conflict (user_id) do update set role = excluded.role;
    raise exception 'FAIL: upsert self-promotion allowed';
  exception when insufficient_privilege then null; end;
  begin
    update public.profiles set user_id = '00000000-0000-0000-0000-000000000005' where user_id = auth.uid();
    raise exception 'FAIL: profile identity changed';
  exception when insufficient_privilege then null; end;
  begin
    delete from public.profiles where user_id = auth.uid();
    raise exception 'FAIL: profile deletion allowed';
  exception when insufficient_privilege then null; end;
  begin
    perform public.set_user_role(auth.uid(), 'admin');
    raise exception 'FAIL: non-admin role RPC succeeded';
  exception when raise_exception then
    if sqlerrm <> 'Access denied: admin role required' then raise; end if;
  end;
  begin
    perform public.set_user_banned('00000000-0000-0000-0000-000000000002', true);
    raise exception 'FAIL: non-admin ban RPC succeeded';
  exception when raise_exception then
    if sqlerrm <> 'Access denied: admin role required' then raise; end if;
  end;
end $$;

set local request.jwt.claim.sub = '00000000-0000-0000-0000-000000000004';
do $$ begin
  begin
    update public.profiles set is_banned = false where user_id = auth.uid();
    raise exception 'FAIL: user cleared their ban';
  exception when insufficient_privilege then null; end;
  begin
    delete from public.profiles where user_id = auth.uid();
    raise exception 'FAIL: banned user deleted profile';
  exception when insufficient_privilege then null; end;
end $$;

set local request.jwt.claim.sub = '00000000-0000-0000-0000-000000000003';
do $$ begin
  if not public.is_admin() or (select count(*) from public.profiles) <> 4 then
    raise exception 'FAIL: legitimate admin read access broken';
  end if;
  perform public.set_user_role('00000000-0000-0000-0000-000000000002', 'admin');
  if not exists (select from public.profiles where user_id = '00000000-0000-0000-0000-000000000002' and role = 'admin') then
    raise exception 'FAIL: authorized role change did not persist';
  end if;
  perform public.set_user_role('00000000-0000-0000-0000-000000000002', 'user');
  perform public.set_user_banned('00000000-0000-0000-0000-000000000002', true);
  if not exists (select from public.profiles where user_id = '00000000-0000-0000-0000-000000000002' and is_banned) then
    raise exception 'FAIL: authorized ban did not persist';
  end if;
end $$;

reset role;
-- SQL maintenance can still bootstrap/administer roles without an end-user JWT.
set local request.jwt.claim.sub = '';
update public.profiles set role = 'admin' where user_id = '00000000-0000-0000-0000-000000000001';
set local role anon;
do $$ begin
  begin
    perform 1 from public.profiles;
    raise exception 'FAIL: anonymous profile read allowed';
  exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
\echo 'PASS: profile permissions, role/ban protection, normal updates and admin RPCs'
