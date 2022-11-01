import core from "@actions/core";
import github from "@actions/github";
import _ from "lodash";

const octokit = github.getOctokit();
octokit.rest.actions.listArtifactsForRepo().then((data) => {
  _.each(data.artifacts, (i) => {
    core.info(`${i.name}-${i.expires_at}`);
  });
});
