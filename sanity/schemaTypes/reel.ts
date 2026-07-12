import { defineField, defineType } from "sanity";

export default defineType({
  name: "reel",
  title: "Reel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video file",
      type: "file",
      description:
        "A short vertical clip (best under ~60s / ~50MB). Plays natively on the site.",
      options: { accept: "video/*" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Poster image (optional)",
      type: "image",
      description: "A still frame shown before the video plays.",
      options: { hotspot: true },
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "fromAmount",
      title: "Starting price (₦, optional)",
      type: "number",
      description: "Show a 'From ₦…' price with a Book button on this reel.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", media: "poster" },
  },
});
