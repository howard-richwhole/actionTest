const core = require("@actions/core");
const github = require("@actions/github");
const _ = require("lodash");

const token = core.getInput('token');
const octokit = github.getOctokit();
octokit.rest.actions.listArtifactsForRepo().then((data) => {
  _.each(data.artifacts, (i) => {
    core.info(`${i.name}-${i.expires_at}`);
  });
});
