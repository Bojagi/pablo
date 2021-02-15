// eslint-disable-next-line import/no-extraneous-dependencies
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function run() {
  const { data } = await octokit.repos.listReleases({ owner: 'bojagi', repo: 'pablo' });
  const draftRelease = data.find((r) => r.draft);
  if (!draftRelease) return;
  const version = draftRelease.tag_name.replace(/^v/, '');
  process.stdout.write(version);
}

run();
