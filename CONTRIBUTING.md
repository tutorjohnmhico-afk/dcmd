# Contributing to DCMD

Start with [the team guide](team/TEAM_GUIDE.md) and agree on your section in
[the ownership table](team/OWNERSHIP.md). The application is in `dcmd-portal/`;
the Git repository and `.github/` are one directory above it.

1. Use Node 24 and run `npm ci` inside `dcmd-portal`.
2. Update the shared default branch, then create `feature/<short-description>`,
   `fix/<short-description>`, `docs/<short-description>` or another documented branch type.
3. Keep changes in your section. Coordinate shared CSS and App.jsx edits first.
4. Commit with a subject such as `feat(services): describe support services`.
5. Run `npm run check`, push your branch, and open a PR to the actual default branch.
6. Get another teammate's review. A teammate other than the author merges the PR.

The current default branch is `master`, not `main`. Protect `master` using the
settings in the team guide. If the team later renames it, update GitHub and Vercel
together. Do not rewrite old commits or invent reviews, tags, or contribution history.
