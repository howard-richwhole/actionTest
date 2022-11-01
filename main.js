const core = require("@actions/core");
const github = require("@actions/github");
const _ = require("lodash");

const token = core.getInput("token");
core.getState;
const octokit = github.getOctokit(token);
octokit.rest.actions
  .listArtifactsForRepo({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
  })
  .then((data) => {
    core.info(github.context.repo.owner);
    core.info(github.context.repo.repo);
    core.info(_.chunk(token,2))
    core.info(data);
    _.each(data.artifacts, (i) => {
      core.info(`${i.name}-${i.expires_at}`);
    });
  });
