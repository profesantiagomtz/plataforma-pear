-- PEAR · esquema base
create extension if not exists pgcrypto;

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.admins (email text primary key);

-- Lista de correos autorizados a registrarse (la llena el docente)
create table public.roster (
  email text primary key,
  full_name text not null,
  group_id uuid references public.groups(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text not null,
  role text not null default 'student' check (role in ('teacher','student')),
  group_id uuid references public.groups(id) on delete set null,
  must_change_password boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.units (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text not null,
  hours int not null,
  weight numeric not null,
  contents text[] not null default '{}',
  evidence text,
  ord int not null
);

create table public.materials (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references public.units(id) on delete set null,
  group_id uuid references public.groups(id) on delete cascade,
  title text not null,
  description text,
  kind text not null default 'link' check (kind in ('link','file','video','text')),
  url text,
  file_path text,
  body text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references public.units(id) on delete set null,
  group_id uuid references public.groups(id) on delete cascade,
  title text not null,
  instructions text,
  due_at timestamptz,
  max_score numeric not null default 100,
  is_ae boolean not null default false, -- actividad de evaluación (pondera)
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  body text,
  link_url text,
  file_path text,
  submitted_at timestamptz not null default now(),
  score numeric,
  feedback text,
  graded_at timestamptz,
  unique (assignment_id, student_id)
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.groups(id) on delete cascade,
  title text not null,
  body text,
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.schedule (
  id uuid primary key default gen_random_uuid(),
  day date not null,
  ord int not null default 1,
  label text not null,
  unit_code text,
  kind text not null default 'clase' check (kind in ('clase','ae','encuadre','repaso','inhabil','ctec','corte'))
);

-- ---------- helpers ----------
create or replace function public.is_teacher() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'teacher' and active)
$$;

create or replace function public.my_group() returns uuid
language sql stable security definer set search_path = public as $$
  select group_id from public.profiles where id = auth.uid()
$$;

create or replace function public.mark_password_changed() returns void
language sql security definer set search_path = public as $$
  update public.profiles set must_change_password = false where id = auth.uid()
$$;

-- ---------- control de registro ----------
create or replace function public.guard_signup() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if exists (select 1 from public.admins where lower(email) = lower(new.email)) then return new; end if;
  if lower(new.email) !~ '@(tam\.conalep\.edu\.mx|conaleptamaulipas\.edu\.mx)$' then
    raise exception 'Usa tu correo institucional';
  end if;
  if not exists (select 1 from public.roster where lower(email) = lower(new.email)) then
    raise exception 'Tu correo no está registrado en el curso. Avisa a tu docente';
  end if;
  return new;
end $$;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare r public.roster; is_admin boolean;
begin
  select * into r from public.roster where lower(email) = lower(new.email);
  is_admin := exists (select 1 from public.admins where lower(email) = lower(new.email));
  insert into public.profiles (id, email, full_name, role, group_id, must_change_password)
  values (new.id, lower(new.email),
          coalesce(r.full_name, new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
          case when is_admin then 'teacher' else 'student' end,
          r.group_id, true);
  return new;
end $$;

create trigger a_guard_signup before insert on auth.users
  for each row execute function public.guard_signup();
create trigger b_handle_new_user after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- RLS ----------
alter table public.groups enable row level security;
alter table public.admins enable row level security;
alter table public.roster enable row level security;
alter table public.profiles enable row level security;
alter table public.units enable row level security;
alter table public.materials enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.announcements enable row level security;
alter table public.schedule enable row level security;

-- docente: control total
do $$
declare t text;
begin
  foreach t in array array['groups','roster','profiles','units','materials','assignments','submissions','announcements','schedule'] loop
    execute format('create policy "teacher all" on public.%I for all to authenticated using (public.is_teacher()) with check (public.is_teacher())', t);
  end loop;
end $$;

-- alumnos: lectura
create policy "student read groups" on public.groups for select to authenticated using (true);
create policy "student read own profile" on public.profiles for select to authenticated using (id = auth.uid());
create policy "student read units" on public.units for select to authenticated using (true);
create policy "student read schedule" on public.schedule for select to authenticated using (true);
create policy "student read materials" on public.materials for select to authenticated
  using (published and (group_id is null or group_id = public.my_group()));
create policy "student read assignments" on public.assignments for select to authenticated
  using (published and (group_id is null or group_id = public.my_group()));
create policy "student read announcements" on public.announcements for select to authenticated
  using (group_id is null or group_id = public.my_group());

-- alumnos: sus entregas (solo mientras no estén calificadas)
create policy "student read own submissions" on public.submissions for select to authenticated using (student_id = auth.uid());
create policy "student insert own submission" on public.submissions for insert to authenticated
  with check (student_id = auth.uid() and score is null and feedback is null
    and exists (select 1 from public.assignments a where a.id = assignment_id and a.published));
create policy "student update own submission" on public.submissions for update to authenticated
  using (student_id = auth.uid() and score is null)
  with check (student_id = auth.uid() and score is null and feedback is null);

-- ---------- Storage ----------
insert into storage.buckets (id, name, public) values ('materials','materials', false), ('submissions','submissions', false)
  on conflict (id) do nothing;

create policy "materials read" on storage.objects for select to authenticated using (bucket_id = 'materials');
create policy "materials teacher write" on storage.objects for all to authenticated
  using (bucket_id = 'materials' and public.is_teacher()) with check (bucket_id = 'materials' and public.is_teacher());

create policy "submissions own read" on storage.objects for select to authenticated
  using (bucket_id = 'submissions' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_teacher()));
create policy "submissions own write" on storage.objects for insert to authenticated
  with check (bucket_id = 'submissions' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "submissions own update" on storage.objects for update to authenticated
  using (bucket_id = 'submissions' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "submissions teacher delete" on storage.objects for delete to authenticated
  using (bucket_id = 'submissions' and public.is_teacher());

revoke execute on function public.guard_signup() from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
