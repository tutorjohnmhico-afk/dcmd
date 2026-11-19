# Future integration for DCMD staff tools

**Reviewer note** — This branch contains a prototype for a consolidated staff tools directory. The public DCMD landing page continues to serve as the division's public website. The future staff area will give authorized users one entry point for their approved tools.

## What to review now

Run `npm --prefix dcmd-portal run dev` from the repository root and select **Log in** in the header to open `/staff-tools`. The local directory has 12 bookmark entries, grouped by purpose, with search and a category filter. The `Login` bookmark is a placeholder whose destination and purpose need confirmation.

A production build serves a status page at `/staff-tools`. The local directory is excluded from the production bundle. The prototype has no credentials, live tool destinations, or sign-in flow.

## Before enabling staff access

1. Confirm the organization's approved identity provider, sign-in policy, and staff groups.
2. Verify sessions and group membership on the server before returning the directory. Apply per-tool access rules where needed. Test that signed-out users and users without staff access cannot retrieve the directory directly.
3. Confirm each destination with its owner and store the approved directory server-side. Check which tools require the internal network or VPN, and which support the organization's single sign-on. Keep each tool's own authorization in force.
4. Verify sign-in, sign-out, session expiry, role restrictions, and access to the tools in a staff-only environment before exposing the route to staff.
