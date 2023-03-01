import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://tuka.dev/",
  author: "Tsukasa NISHIYAMA",
  nickname: "tuka",
  jobRole: "Customer Reliability Engineer",
  desc: "ゆるく、ざつに、なにかかく - I'll write something loose and simple.",
  title: "つかのブログ",
  ogImage: "site-og.png",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/tukaelu/tuka.dev",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://github.com/tukaelu",
    linkTitle: `${SITE.nickname} on Twitter`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/tsukasa.nishiyama.82/",
    linkTitle: `${SITE.nickname} on Facebook`,
    active: true,
  },
  {
    name: "Keybase",
    href: "https://keybase.io/tukaelu",
    linkTitle: `${SITE.nickname} on Keybase`,
    active: true,
  },
  {
    name: "RssFeed",
    href: "/rss.xml",
    linkTitle: `RSS Feed`,
    active: true,
  },
];
