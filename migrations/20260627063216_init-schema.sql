-- Core schema for the lila photo feed: posts + likes.
-- Mirrors the schema already running in production so a fresh InsForge
-- project can be brought up to the same state with `db migrations up --all`.

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  image_url varchar(500) not null,
  image_key text,
  caption text,
  created_at timestamp without time zone default now()
);

create index if not exists idx_posts_user on public.posts (user_id);
create index if not exists idx_posts_created on public.posts (created_at desc);

alter table public.posts enable row level security;

create policy posts_select_all on public.posts
  for select
  using (true);

create policy posts_insert_own on public.posts
  for insert
  with check (user_id = auth.uid());

create policy posts_update_own on public.posts
  for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy posts_delete_own on public.posts
  for delete
  using (user_id = auth.uid());

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  post_id uuid not null references public.posts (id) on delete cascade,
  created_at timestamp without time zone default now(),
  unique (user_id, post_id)
);

create index if not exists idx_likes_post on public.likes (post_id);
create index if not exists idx_likes_user on public.likes (user_id);

alter table public.likes enable row level security;

create policy likes_select_all on public.likes
  for select
  using (true);

create policy likes_insert_own on public.likes
  for insert
  with check (user_id = auth.uid());

create policy likes_delete_own on public.likes
  for delete
  using (user_id = auth.uid());
