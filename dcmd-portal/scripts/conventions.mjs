import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export const validBranch = value => /^(feature|feat|fix|hotfix|release|docs|chore|test|refactor|ci)\/[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(value);
export const validCommit = value => /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9][a-z0-9/_-]*\))?!?: .+/.test(value);

export function checkEnvironment(env = process.env) {
  if (!env.PR_BRANCH || !env.PR_BASE_SHA || !env.PR_HEAD_SHA || !env.PR_TITLE) {
    throw new Error('Run in a pull request with PR_BRANCH, PR_BASE_SHA, PR_HEAD_SHA and PR_TITLE set.');
  }
  if (!validBranch(env.PR_BRANCH)) throw new Error('Use a branch such as feature/header-hero or fix/contact-link.');
  if (!validCommit(env.PR_TITLE)) throw new Error('PR titles must use Conventional Commits, for example feat(services): update service cards.');
  for (const sha of [env.PR_BASE_SHA, env.PR_HEAD_SHA]) {
    if (!/^[a-f0-9]{40,64}$/.test(sha)) throw new Error('Invalid commit SHA');
  }
  const range = `${env.PR_BASE_SHA}..${env.PR_HEAD_SHA}`;
  const subjects = execFileSync('git', ['log', '--no-merges', '--format=%s', range], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  const invalid = subjects.filter(subject => !validCommit(subject));
  if (invalid.length) throw new Error('New commits must follow Conventional Commits:\n' + invalid.join('\n'));
  console.log('Branch, PR title and new non-merge commits follow team conventions.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { checkEnvironment(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
