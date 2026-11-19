# DCMD team handoff

## Current project

- Existing repository: https://github.com/tutorjohnmhico-afk/dcmd
- Local repository: `C:\Users\John Mhico Tutor\Desktop\dcmd`
- App: `dcmd-portal/`; GitHub workflows: `.github/` at the repository root.
- Existing default branch: `master`. Treat it as the protected release branch.
- Preparation branch: `chore/team-collaboration` (commit and push this branch, then request review).
- Team names, handles, rotation dates, and live deployment URL are still to assign.

## Maintainer: prepare the shared repo once

1. Review the preparation commits and their changed-file lists before opening the
   integration PR. Portal, CI, and team guidance are kept in scoped commits. Only files belonging
   to the DCMD website should be included. Stage exact files for future work and inspect the
   staged diff before committing; coordinate unrelated changes with their owner.
2. Invite at least one teammate as a collaborator. Agree on the ownership table.
3. Publish this preparation on its branch, open a PR and have a teammate review and
   merge it. Pushing the branch does not merge, release or deploy the preparation.
4. Enable GitHub Actions if needed. After the first PR run, configure a branch
   protection rule or ruleset for `master`: require a PR, at least one approval,
   dismiss stale approvals, resolve conversations, and require **Portal checks**
   and **PR conventions**. Require the branch to be up to date. Block force pushes
   and deletion; apply the policy to administrators / disable bypass where available.
   Do not enable a required check before its first successful run registers it.
5. Enable squash merges and use a Conventional Commit PR title as the squash
   subject. Even with squash merging, keep each new commit conventional for grading.
6. Connect the existing repository to Vercel, or confirm the existing connection.
   Root Directory: `dcmd-portal`; Framework: Vite; Node: 24.x; install: `npm ci`;
   build: `npm run build`; output: `dist`; Production Branch: `master`.
7. Add the actual production URL and settings/review evidence to the criteria
   checklist. Repository files alone do not enable branch protection or deployment.

GitHub settings reference:
https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches

Vercel Root Directory reference: https://vercel.com/docs/monorepos

## Send this to your teammates

We will use the existing DCMD repository. Please send your GitHub username so I
can add you. We will assign sections and rotate maintainer, reviewer and release
manager every module. Check `team/OWNERSHIP.md` before editing.

1. Install Git and Node 24. Accept the repository invitation.
2. Clone and run the app:

   ```sh
   git clone https://github.com/tutorjohnmhico-afk/dcmd.git
   cd dcmd/dcmd-portal
   npm ci
   npm run dev
   ```

3. From the repository root (`cd ..`), update the release branch and create your branch:

   ```sh
   git switch master
   git pull --ff-only origin master
   git switch -c feature/header-hero
   ```

   Choose your task's name, for example `feature/about-mandate`,
   `feature/services`, `feature/contact-footer`, `fix/contact-link`,
   `docs/team-guide`, or `hotfix/mobile-menu`. Use lowercase words separated by
   hyphens, under a conventional prefix. Do not work directly on `master`.

4. Change only your assigned section. Coordinate shared styles, dependencies and
   navigation first. From `dcmd-portal`, run `npm run check`. Check desktop/mobile,
   keyboard tab order, menu open/close and Escape, every navigation anchor, and email links.
5. From the repo root, stage exact files and inspect the staged diff:

   ```sh
   git add dcmd-portal/src/components/sections/Hero.jsx
   git diff --cached
   git commit -m "feat(hero): improve the division introduction"
   git push -u origin feature/header-hero
   ```

6. Open a PR to `master`. Use a conventional title such as
   `feat(hero): improve the division introduction`. Link the issue, explain what
   changed, attach mobile/desktop screenshots and paste the Vercel preview URL.
   Request a teammate's review. Fix feedback and re-request review.
7. A teammate other than the author merges after approval and green checks. Do not
   approve or merge your own PR. Update your local `master` afterward.

Each teammate must make real changes and commits under their own Git identity.
Do not share credentials, manufacture commits, or assign someone else's work to yourself.

## Resolve conflicts without losing another person's work

Save/commit your own branch changes first; do not pull with unrelated dirty work.

```sh
git fetch origin
git switch feature/header-hero
git merge origin/master
```

Read each conflict with the other section owner. Keep the intended changes from
both sides, remove the conflict markers, and rerun `npm run check` inside the app.
Stage the resolved files explicitly, finish the merge, and push your feature branch:

```sh
git add path/to/resolved-file
git commit -m "chore: resolve integration conflicts"
git push
```

If unsure, use `git merge --abort` and ask the maintainer. Do not use force push,
reset hard, or choose all ours/theirs just to clear a conflict. Record the resolved
files and validation in the PR; request a fresh review after resolution.

## Release v1.0.0

The release manager waits until all required section PRs are approved and merged,
CI passes, approved content is in place, and the Vercel production page works on
mobile and desktop. Then use a clean, updated release branch:

```sh
git switch master
git pull --ff-only origin master
git status
git tag -a v1.0.0 -m "release: DCMD portal v1.0.0"
git push origin v1.0.0
```

Only create the tag after the release is genuinely ready. Publish GitHub release
notes with reviewed PR links, the exact release commit, the live Vercel URL and
known limitations. A tag does not itself configure a Vercel deployment.

## Deliver a real hotfix

After v1.0.0, record an actual production defect in the hotfix issue template.
Create `hotfix/<description>` from updated `master`, make a focused `fix(...): ...`
commit, add a regression check where appropriate, and open a PR. Get another
person's review and merge through the same protection rules. Verify production,
then have the release manager tag the corrected release `v1.0.1`. Record issue,
PR, reviewer, tag and deployment evidence. Do not push the repair straight to the
release branch or invent a defect to create grading evidence.

## Every module

Rotate roles, update section/issue assignments, review each other's PRs, and keep
the evidence checklist current. Files here prepare the process; only real reviewed
teamwork, actual release tags and a verified deployment complete the criteria.
