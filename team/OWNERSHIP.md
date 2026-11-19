# Section ownership and rotating roles

Fill in real names and GitHub handles together before teammates begin. These are
assignment slots, not completed contributions. One team represents one office: DCMD.

| Website section | Pair | Team of 4+ | Main files |
| --- | --- | --- | --- |
| Header and hero | Person A | Person 1 | `dcmd-portal/src/components/layout/Header.jsx`, `sections/Hero.jsx`, `sections/CapabilityStrip.jsx`, `src/data/navigation.js` |
| About and mandate / direction | Person A | Person 2 | `dcmd-portal/src/components/sections/About.jsx`, `Vision.jsx` |
| Services | Person B | Person 3 | `dcmd-portal/src/components/sections/Services.jsx`, `src/data/services.js` |
| Contact and footer | Person B | Person 4 | `dcmd-portal/src/components/sections/Contact.jsx`, `src/components/layout/Footer.jsx` |
| Systems | Agree together | Person 5 or shared | `dcmd-portal/src/components/sections/Systems.jsx`, `src/data/systems.js` |

For five or more members, share sections or add Officials / News only after the
team agrees on approved content and scope. Do not make up names, mandates or news.
The About copy is a description; the team must verify any official mandate text.

Shared integration files: `App.jsx`, `App.css`, `index.css`, `Arrow.jsx`, package
files, Vercel configuration, and CI. Coordinate these edits before starting. Add
section-specific styles in a local CSS file rather than repeatedly editing shared CSS.

| Module | Maintainer | Reviewer | Release manager | Section assignments / issue links |
| --- | --- | --- | --- | --- |
| 1 | To assign | To assign | To assign | To assign |
| 2 | Rotate | Rotate | Rotate | To assign |
| 3 | Rotate | Rotate | Rotate | To assign |

Maintainer owns integration and merges reviewed PRs. Reviewer reads each PR and
checks its preview. Release manager tags and ships approved work. Rotate every
module. In a pair, split responsibilities between both members: review and merge
each other's PRs, never your own. A person can cover more than one role when needed,
but an author cannot approve or merge their own PR.
