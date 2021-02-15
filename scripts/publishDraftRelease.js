// eslint-disable-next-line import/no-extraneous-dependencies
const { Octokit } = require('@octokit/rest');

const OWNER_REPO = { owner: 'bojagi', repo: 'pablo' };

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function run() {
  const { data } = await octokit.repos.listReleases(OWNER_REPO);
  const draftRelease = data.find(
    (r) =>
      r.draft &&
      (r.tag_name === `v${process.env.RELEASE_VERSION}` ||
        r.tag_name === process.env.RELEASE_VERSION)
  );

  if (!draftRelease) {
    console.error(`No matching draft found (${process.env.RELEASE_VERSION})`);
    return process.exit(0);
  }

  console.log(JSON.stringify(draftRelease, null, 2)

  console.info(`Try to update release with id "${draftRelease.release_id}"`);

  try {
    await octokit.repos.updateRelease({
      ...OWNER_REPO,
      release_id: draftRelease.release_id,
      draft: false,
    });
  } catch (err) {
    console.error(`Could not publish the release, please do it manually`);
    console.error(err);
    return process.exit(1);
  }

  console.info(`Published release ${process.env.RELEASE_VERSION}`);

  return process.exit(0);
}

run();
