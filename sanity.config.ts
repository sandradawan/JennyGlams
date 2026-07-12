"use client";

/**
 * Configuration for the embedded Sanity Studio at /studio.
 * This is where Jenny logs in to upload looks and reels.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  name: "jennyglams",
  title: "JennyGlams Studio",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
