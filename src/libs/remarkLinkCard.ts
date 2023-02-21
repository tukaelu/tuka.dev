import type { Plugin } from "unified";
import type { Node, Parent } from "unist";
import { visit } from "unist-util-visit";
import ogs from "open-graph-scraper";

type LinkNode = Node & {
  type: "link";
  title: string | undefined;
  url: string;
  children: TextNode[];
};

type TextNode = Node & {
  type: "text";
  value: string;
};

type ElementNode = Node & {
  value: string;
};

type OgObject = {
  ogSiteName?: string | undefined;
  ogTitle?: string | undefined;
  ogType?: string | undefined;
  ogUrl?: string | undefined;
  ogDescription?: string | undefined;
  ogImage?: OgImageObject | undefined;
  twitterCard?: string | undefined;
  twitterSite?: string | undefined;
  twitterTitle?: string | undefined;
  twitterDescription?: string | undefined;
  requestUrl?: string;
  favicon?: string | undefined;
  success?: boolean;
};

type OgImageObject = {
  url: string;
  type: string;
  height?: string | number;
  width?: string | number;
};

// see. https://github.com/unifiedjs/unified#function-transformertree-file-next
const remarkLinkCard: Plugin = () => async (tree: Node) => {
  const transformers: Promise<void>[] = [];

  // Convert link text written directly in Markdown to link cards.
  //
  // e.g.
  // {
  //   type: 'link',
  //   title: null,
  //   url: 'https://tukaelu.hatenablog.jp/entry/2022/12/24/000000',
  //   children: [
  //     {
  //       type: 'text',
  //       value: 'https://tukaelu.hatenablog.jp/entry/2022/12/24/000000',
  //       position: [Object]
  //     }
  //   ],
  //   position: {
  //     start: { line: 4, column: 1, offset: 50 },
  //     end: { line: 4, column: 54, offset: 103 }
  //   }
  // }
  visit(tree, "link", (node: LinkNode, index: number, parent: Parent) => {
    if (node.url !== node.children[0].value) return;
    transformers.push(
      ogs({ url: node.url })
        .then(async ({ error, result }) => {
          if (error) {
            console.error(error);
            return;
          }
          const ogData = result as OgObject;
          const replace = generateLinkCardNode(ogData);

          parent.children.splice(index, 1, replace);
        })
        .catch(error => {
          console.error(error);
        })
    );
  });

  // do transform
  await Promise.all(transformers);
};

export default remarkLinkCard;

const generateLinkCardNode = (data: OgObject): ElementNode => {
  const elemDescription = data.ogDescription
    ? `<p class="linkcard__description">${data.ogDescription}</p>`
    : "";

  // TODO I'll add it soon...
  // const elemFavicon = data.favicon
  //   ? `<img class="linkcard__favicon" src="${data.favicon}" />`
  //   : '';

  const elemThumbnail = data.ogImage?.url
    ? `<img class="linkcard__image" src="${data.ogImage?.url}" alt="" />`
    : "";

  const linkCardNodeTag = `
    <div class="linkcard__container not-prose">
      <a class="linkcard" href="${data.ogUrl}" target="_blank" rel="noopener noreferrer">
        <div class="linkcard__main">
          <div class="linkcard__thumbnail">
            ${elemThumbnail}
          </div>
          <div class="linkcard__content">
            <p class="linkcard__title">${data.ogTitle}</p>
            ${elemDescription}
          </div>
        </div>
      </a>
    </div>
  `;

  return {
    type: "html",
    value: linkCardNodeTag,
  } as ElementNode;
};
