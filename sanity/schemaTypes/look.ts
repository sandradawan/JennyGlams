import { defineField, defineType } from "sanity";

export default defineType({
  name: "look",
  title: "Look",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Name of the look, e.g. 'The Ivory Bride'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated web address. Click 'Generate'.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      description: "The makeup photo. Drag to reposition the focal point.",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Bridal", "Soft Glam", "Editorial", "Party", "Owambe"],
        layout: "radio",
      },
      initialValue: "Soft Glam",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fromAmount",
      title: "Starting price (₦)",
      type: "number",
      description: "Shown as 'From ₦…' on the site.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "A sentence or two about the look (optional).",
    }),
    defineField({
      name: "featured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first. Leave 0 for newest-first.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
