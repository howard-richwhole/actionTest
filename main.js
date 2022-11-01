const core = require("@actions/core");
const github = require("@actions/github");
const _ = require("lodash");

const token = core.getInput("token");

const octokit = github.getOctokit(token);
octokit.rest.actions
  .listArtifactsForRepo({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
  })
  .then(({ data }) => {
    const artifacts = _.chain(data.artifacts)
      .sortBy((i) => new Date(i.expires_at))
      .each(i=>{
        core.info(`{id:${i.id},name:${i.name},expires_at:${i.expires_at}}`);
      })
      .dropRight()
      .each((i) => {
        octokit.rest.actions
          .deleteArtifact({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            artifact_id: i.id,
          })
          .then(() => {
            core.info(`deleted ${i.id}-${i.name}`);
          });
      })
      .value();
    if(!_.size(artifacts)){
      core.info('nothing delete');
    }
  });
