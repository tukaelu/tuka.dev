import generateOgImage from "@utils/generateOgImage";
import type { APIRoute, MarkdownInstance } from "astro";
import type { Frontmatter } from "@types";

export const get: APIRoute = async ({ params }) => ({
  body: await generateOgImage(params.ogTitle),
});

const posts = Object.values(
  import.meta.glob<MarkdownInstance<Frontmatter>>("../contents/**/*.md", {
    eager: true,
  })
).filter(({ frontmatter }) => !frontmatter.draft);

export function getStaticPaths() {
  return posts
    .filter(({ frontmatter }) => !frontmatter.ogImage)
    .map(({ frontmatter }) => ({
      params: { ogTitle: frontmatter.title },
    }));
}
