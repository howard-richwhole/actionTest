const core = require("@actions/core");
const github = require("@actions/github");
const _ = require("lodash");

const token = core.getInput('token');
core.getState
const octokit = github.getOctokit(token);
octokit.rest.actions.listArtifactsForRepo({owner:github.context.repo.owner ,repo:github.context.repo.repo}).then((data) => {
  core.info(`show:${data.artifacts.length}`)
  _.each(data.artifacts, (i) => {
    core.info(`${i.name}-${i.expires_at}`);
  });
});
