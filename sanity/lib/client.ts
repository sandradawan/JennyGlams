import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Read-only client for fetching published content on the public site.
 * Falls back to a dummy project id so imports never throw before the CMS is
 * configured — queries simply return nothing and the app uses mock data.
 */
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});
