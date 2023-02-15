import { defineConfig } from "tinacms";
import { cdate } from "cdate";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINACMS_CLIENT_ID, // Get this from tina.io
  token: process.env.TINACMS_TOKEN, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads/images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/contents",
        ui: {
          defaultItem: {
            author: "tuka",
            featured: false,
            draft: true,
          },
          filename: {
            slugify: values => {
              return `${cdate(values.publishedAt).format("YYYY-MM-DD")}_${values.slug}`
            },
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            required: true,
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "PublishedAt",
            required: true,
          },
          {
            type: "datetime",
            name: "updatedAt",
            label: "UpdatedAt",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
            required: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            required: true,
          },
        ],
      },
    ],
  },
});
