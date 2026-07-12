import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

/**
 * Config for the `sanity` command-line tool.
 * Used to run the Studio locally (`npx sanity dev`) or deploy the hosted Studio
 * (`npx sanity deploy`) at https://<name>.sanity.studio.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  // Pre-set the hosted Studio hostname so `sanity deploy` doesn't prompt:
  // the Studio lives at https://jennyglams.sanity.studio
  studioHost: "jennyglams",
  // Set from the first successful deploy so re-deploys don't prompt for it.
  deployment: {
    appId: "ml82c78vzpdnfij8lwzrbmeo",
  },
});
