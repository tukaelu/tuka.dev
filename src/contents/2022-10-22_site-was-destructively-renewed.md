---
title: 破壊的にサイトをリニューアルした
slug: site-was-destructively-renewed
description: Next.jsでサイトを構築してみた。
ogImage: ''
tags:
  - 雑記
publishedAt: '2022-10-22T11:30:00.000+09:00'
updatedAt: '2022-10-22T11:30:00.000+09:00'
author: tuka
featured: false
draft: false
---

リポジトリごと消して、作り直してやったぜ。ワイルドだろ..。

昨晩思い立ってリポジトリを作成して、今朝起きてから実装してみた。

## モチベーション

仕事では全くコードを書かないので日常のどこかでやらないとと思っていて、今月誕生日を迎え新たなレンジに突入したのもあり、色々とトライしたい欲や危機感のようなものが高まったことは少なからず根底にあるかも。

色々と作りたいものはあるけどまずはストレッチを兼ねてシュッとできるところからはじめてみようと、特に先代リポジトリに未練もないのでリファクタリングするのではなく丸っと作り直した。

完全に勢い駆動だ。

## 使用している技術

実装にあたり使用している技術などはこの手のサイトを作る際によく使われるやつだけど、僕が普段全く触らないものたちではある。

- Next.js
- TypeScript
- MDX (next-mdx-remote)
- Chakra UI
- Vercel

<br/>

以前はRemarkで変換したHTMLを`dangerouslySetInnerHTML`にぶち込んでCSSをあてていたけど、今回はChakra-UIを使いたかったのでこんな感じでタグから任意のコンポーネントに変換している。

```tsx
import {
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Image,
  Code,
} from '@chakra-ui/react'

const components = {
  h1: (props: any) => <CustomHeading as="h1" fontSize="3xl" {...props} />,
  h2: (props: any) => <CustomHeading as="h2" fontSize="2xl" {...props} />,
  h3: (props: any) => <CustomHeading as="h3" fontSize="xl" {...props} />,
  p: (props: any) => {
    return <Text as="p" mb="4" lineHeight="140%" {...props} />
  },
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  img: Image,
  code: Code,
}

const MarkdownContent = ({ mdxSource }: MarkdownProps) => {
  return <MDXRemote {...mdxSource} components={components} />
}
```

もう少しやり方があったかもと思いつつ一旦これでよいかな。フロント周りの学習しつつ、リファクタしていければよさそう。

## TODO

合間にやっていく。

- [ ] OG画像対応
- [ ] TOC(Tabel Of Contents)の表示
- [ ] Renovate or Dependabot導入
- [ ] Mermaidのサポート
- [ ] 表示周りの調整
- [ ] Homeを整える
- [ ] テスト書く
