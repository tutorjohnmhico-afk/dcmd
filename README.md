# DCMD webpage and team workspace

The public webpage is in **dcmd-portal/**. This is the existing repository; do not initialize another Git repository inside the app.

- [Run and check the webpage](dcmd-portal/README.md)
- [Team instructions: start here](team/TEAM_GUIDE.md)
- [Assign sections and rotate roles](team/OWNERSHIP.md)
- [Contribution workflow](CONTRIBUTING.md)
- [Project criteria and evidence](team/CRITERIA_CHECKLIST.md)
- [Future DCMD staff tools integration](team/DCMD_TOOLS_INTEGRATION.md)

```sh
cd dcmd-portal
npm ci
npm run dev
```

Use Node 24. Before opening a PR, run `npm run check` inside dcmd-portal.
The existing default branch is master. Work on conventional feature branches and merge only through another teammate's approved pull request.

This preparation adds components, checks and workflow files. It does not claim a published deployment, completed team contributions, release tag or enabled branch protection. The maintainer must review the scoped preparation commits before merging the collaboration branch.
