begin;

create table public.dcmd_staff_members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  active boolean not null default true
);

create table public.dcmd_staff_tools (
  id text primary key,
  name text not null,
  category text not null,
  url text check (url is null or url ~ '^https://[^[:space:]/?#@]+([/?#]|$)'),
  available_to_all_staff boolean not null default false,
  enabled boolean not null default false,
  check (not enabled or url is not null)
);

create table public.dcmd_staff_tool_grants (
  user_id uuid references public.dcmd_staff_members (user_id) on delete cascade,
  tool_id text references public.dcmd_staff_tools (id) on delete cascade,
  primary key (user_id, tool_id)
);

alter table public.dcmd_staff_members enable row level security;
alter table public.dcmd_staff_tools enable row level security;
alter table public.dcmd_staff_tool_grants enable row level security;

revoke all on public.dcmd_staff_members, public.dcmd_staff_tools, public.dcmd_staff_tool_grants
  from public, anon, authenticated;
grant select on public.dcmd_staff_members, public.dcmd_staff_tools, public.dcmd_staff_tool_grants
  to authenticated;

create policy "Read own active membership"
on public.dcmd_staff_members for select to authenticated
using (active and user_id = (select auth.uid()));

create policy "Read own tool grants"
on public.dcmd_staff_tool_grants for select to authenticated
using (
  user_id = (select auth.uid())
  and exists (select 1 from public.dcmd_staff_members member where member.user_id = (select auth.uid()))
);

create policy "Read enabled and assigned staff tools"
on public.dcmd_staff_tools for select to authenticated
using (
  enabled
  and exists (select 1 from public.dcmd_staff_members member where member.user_id = (select auth.uid()))
  and (
    available_to_all_staff
    or exists (
      select 1 from public.dcmd_staff_tool_grants tool_grant
      where tool_grant.tool_id = dcmd_staff_tools.id and tool_grant.user_id = (select auth.uid())
    )
  )
);

insert into public.dcmd_staff_tools (id, name, category) values
  ('hris', 'HRIS', 'Staff & collaboration'),
  ('dcmd-ict', 'DCMD ICT', 'Staff & collaboration'),
  ('sharepoint', 'SharePoint', 'Staff & collaboration'),
  ('zabbix', 'Zabbix', 'Monitoring & support'),
  ('itsm', 'ITSM', 'Monitoring & support'),
  ('bmc-firewall', 'BMC-FIREWALL', 'Network & security'),
  ('bch-firewall', 'BCH-FIREWALL', 'Network & security'),
  ('sophos-vpn', 'Sophos-VPNPortal', 'Network & security'),
  ('bch-wlc', 'BCH-WLC', 'Network & security'),
  ('bmc-wlc', 'BMC-WLC', 'Network & security'),
  ('network-backup', 'BCH / BMC · Network Backup Manager', 'Network & security'),
  ('login', 'Login', 'Access');

commit;
