# Future integration for DCMD staff tools

**Reviewer note** — This branch prepares the DCMD staff portal for future integration. The public homepage stays available. Staff access requires an organization-managed Supabase project, approved destinations, and individual account provisioning.

## Review the branch

Run `npm --prefix dcmd-portal run dev` and select **Log in** in the header. With no Supabase configuration, the local route shows the 12 bookmark entries with search and category filters. An unconfigured production build shows a status page. The local inventory is excluded from production JavaScript.

With a configured project, staff sign in with their own work email and password. They set an initial password using an invitation code and can request a reset code by email. Account creation and access assignment are administrator tasks. The portal reads only the enabled destinations that the database authorizes for the signed-in staff account.

## Configure an approved Supabase project

1. Apply [the staff tools migration](../supabase/migrations/20261119000100_dcmd_staff_tools.sql) in the approved Supabase project. The migration creates the directory and access rules. Every tool starts disabled and without a URL.
2. In Supabase Auth, enable email/password sign-in, disable public registration, and configure the organization's email sender. Set the minimum password length to 12 or longer. In the **Invite user** and **Reset password** templates, include `{{ .Token }}` and tell users to enter the code at `/staff-tools`. Invite staff individually from **Authentication → Users**.
3. In the Vercel project with root directory `dcmd-portal`, add `VITE_SUPABASE_URL` (the HTTPS project URL) and `VITE_SUPABASE_PUBLISHABLE_KEY` (the `sb_publishable_` key) for the intended environment and redeploy. For local work, set the same variables in `dcmd-portal/.env.local`. Vite embeds these public values in the bundle. Keep administrative keys out of frontend configuration and Git.
4. After confirming each invitee's identity, use their Supabase Auth user UUID to add a `dcmd_staff_members` row. In `dcmd_staff_tools`, enter the approved HTTPS destination and enable it. Assign restricted tools through `dcmd_staff_tool_grants`, using the staff UUID and the tool's ID. Use `available_to_all_staff` only for tools approved for every active staff member. Confirm what the **Login** bookmark points to before enabling it.
5. In a staff-only test environment, verify initial setup, password reset, sign-in, sign-out, and expired codes. Use separate staff accounts to verify that a user with no tool grant cannot read restricted destinations and that removing staff access blocks new requests. The linked systems retain their own account and network access requirements.

To remove someone's portal access, set their membership to inactive or remove it. Delete individual tool grants when a staff member no longer needs the tool.
