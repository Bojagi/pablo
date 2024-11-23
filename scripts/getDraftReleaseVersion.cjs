// eslint-disable-next-line import/no-extraneous-dependencies
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function run() {
  const { data } = await octokit.repos.listReleases({ owner: 'bojagi', repo: 'pablo' });
  const draftReleases = process.env.VERSION_SHOULD_MATCH
    ? // Should match the passed version
      data.filter((r) => r.draft && r.tag_name === `v${process.env.VERSION_SHOULD_MATCH}`)
    : // Needs to have a tag name attached
      data.filter((r) => r.draft && !!r.tag_name);

  if (!draftReleases.length === 0) {
    console.error('No matching draft found');
    return process.exit(1);
  }

  if (draftReleases.length > 1) {
    console.error(
      'There are multiple draft releases, please run this workflow again with a specific version number'
    );
    return process.exit(1);
  }

  const version = draftReleases[0].tag_name.replace(/^v/, '');
  process.stdout.write(version);
}

run();
