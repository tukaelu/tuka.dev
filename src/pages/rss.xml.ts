import rss from "@astrojs/rss";
import { SITE } from "@config";
import slugify from "@utils/slugify";
import type { MarkdownInstance } from "astro";
import type { Frontmatter } from "@types";

const posts = Object.values(
  import.meta.glob<MarkdownInstance<Frontmatter>>("../contents/**/*.md", {
    eager: true,
  })
).filter(({ frontmatter }) => !frontmatter.draft);

export async function get() {
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: posts.map(({ frontmatter }) => ({
      link: `posts/${slugify(frontmatter)}`,
      title: frontmatter.title,
      description: frontmatter.description || "",
      pubDate: new Date(frontmatter.publishedAt),
    })),
  });
}
