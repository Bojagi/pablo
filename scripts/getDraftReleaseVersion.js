// eslint-disable-next-line import/no-extraneous-dependencies
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function run() {
  const { data } = await octokit.repos.listReleases({ owner: 'bojagi', repo: 'pablo' });
  const draftRelease = process.env.VERSION_SHOULD_MATCH
    ? // Should match the passed version
      data.find((r) => r.draft && r.tag_name === `v${process.env.VERSION_SHOULD_MATCH}`)
    : // Needs to have a tag name attached
      data.find((r) => r.draft && !!r.tag_name);

  if (!draftRelease) {
    console.error('No matching draft found');
    return process.exit(1);
  }

  const version = draftRelease.tag_name.replace(/^v/, '');
  process.stdout.write(version);
}

run();
