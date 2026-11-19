# DCMD Portal

Public React + Vite webpage for the Data Center Management Division, City
Government of Butuan. This app lives in the existing
[`tutorjohnmhico-afk/dcmd`](https://github.com/tutorjohnmhico-afk/dcmd) repository.

## Run locally

Install Node 24, then from a fresh clone:

```sh
git clone https://github.com/tutorjohnmhico-afk/dcmd.git
cd dcmd/dcmd-portal
npm ci
npm run dev
```

Open the local URL Vite prints. No backend or private environment variables are
required. Contact details and official copy still need the team's approval.

## Checks

```sh
npm run check
```

This runs Oxlint, convention validator tests, server-rendered page checks, and a
production build. Page checks verify section targets, unique IDs, a single h1,
service/system cards, and contact/navigation markup. They do not replace checking
mobile layout or keyboard interaction in a browser.

```sh
npm run build
npm run preview
```

`dist/` is generated and should not be committed.

## Team workflow

- [Team guide and ready-to-share instructions](../team/TEAM_GUIDE.md)
- [Section ownership and role rotation](../team/OWNERSHIP.md)
- [Contributing](../CONTRIBUTING.md)
- [Criteria evidence checklist](../team/CRITERIA_CHECKLIST.md)

`src/App.jsx` composes small section components. Content arrays live in `src/data`.
Coordinate edits to shared styles and navigation to reduce merge conflicts.

## Vercel

Use the existing GitHub repository. Set Vercel's **Root Directory** to
`dcmd-portal`, framework to **Vite**, build to `npm run build`, output to `dist`,
install command to `npm ci`, and Node version to **24.x**. Production branch is
currently `master`. The committed `vercel.json` supplies the app's build settings;
repository connection, production branch and root directory are account settings.
See the team guide for review, preview and release steps.
