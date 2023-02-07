---
title: Next.jsのサイトにリンクカードを実装した
slug: implement-link-card-with-nextjs
description: Markdownで書かれた記事にベタ書きされたリンクをカード表示したかったのでVercelのServerless Functionsを使って実装してみた。
ogImage: ''
tags:
  - Nextjs
  - Vercel
publishedAt: '2022-10-25T09:15:00.000+09:00'
updatedAt: '2022-10-25T09:15:00.000+09:00'
author: tuka
featured: false
draft: false
---

## やりたいこと

記事のMarkdownにベタ書きされたリンクをいい感じにカード表示したい！

```markdown
## リンクカードに変換する

https://example.com

## リンクカードに変換しない

[変換しないよ](https://example.com/)
```

## どうやるかを考える

このサイトはNext.jsで実装されていて、GithubにプッシュするとVercelにデプロイされる。

当初はビルドの際にベタ書きされたリンクがあったらカード化してしまえと考えたけど、VercelではServerless Functionsを使って自前のAPIを用意できる。
ページが表示されたタイミングでOGPタグの情報を取得するAPIにアクセスして、クライアント側でカードを表示する方式を採ってみることにした。

## 実装する

OGPの取得には[open-graph-scraper](https://github.com/jshemas/openGraphScraper)を使おうと思ったけど、2022年10月25日時点ではTypescriptに非対応だった。

目的に対して少しい大きいけど[jsdom](https://github.com/jsdom/jsdom)を使おうと思ったら、それよりパフォーマンスが出るっぽい[happy-dom](https://github.com/capricorn86/happy-dom)を見つけた。
しかし、こちらはエラーが出てしまいシュッと回避できなかったため、結局jsdomを使うことにした。

`pages/api/`の配下に、`/api/xxx?url=https://example.com`でアクセスされたらリンクカードに必要な情報をJSONで返すAPIを実装する。

```ts
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { JSDOM } from 'jsdom'

export type OgData = {
  url: string
  siteName?: string
  title?: string
  description?: string
  image?: string
  type?: string
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url

  if (!url) {
    res.status(400)
    return
  }

  const httpRes = await fetch(url)
  if (!httpRes.ok) {
    res.status(404)
    return
  }

  const resHtml = await httpRes.text()
  const jsdom = new JSDOM(resHtml)

  const og: OgData = { url }
  const metaTags = jsdom.window.document.getElementsByTagName('meta')

  for (const metaTag of metaTags) {
    const property = metaTag.getAttribute('property')
    const content = metaTag.getAttribute('content')
    switch (property) {
      case 'og:site_name':
        og.siteName = content || undefined
        break
      case 'og:title':
        og.title = content || undefined
        break
      case 'og:description':
        og.description = content || undefined
        break
      case 'og:image':
        og.image = content || undefined
        break
      case 'og:type':
        og.type = content || undefined
        break
      default:
      // nop
    }
  }

  res.setHeader('Cache-Control', 'max-age=86400')
  res.send(og)
}

export default handler
```

リンクカードのコンポーネントでは`useEffect`からAPIにアクセスする。
OGタグ取得中はローディング表示させたいので`isCompleted`のフラグで表示するコンポーネントを切り替えてあげる。

```jsx
import { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

type OgState = {
  ogData?: OgData
  isCompleted: boolean
}

const LinkCard = ({href: string}) => {
  const [state, setState] = useState<OgState>({
    ogData: undefined,
    isCompleted: false,
  })

  useEffect(() => {
    fetch(`/api/xxx?url=${encodeURIComponent(href)}`)
      .then((payload) => payload.json())
      .then((data) => {
        setState({
          ogData: data,
          isCompleted: true,
        })
      })
  }, [href])

  return !state.isCompleted ? (
    <LinkCardLoading />
  ) : (
    <LinkCardCompleted ogData={state.ogData as OgData} />
  )
}
```

サイトのスタイルにはChakra-UIを使っていたので、読込中の表示は[Skeleton](https://chakra-ui.com/docs/components/skeleton)で簡単に実装できた。

```jsx
const LinkCardLoading = () => {
  return (
    <Box border="1px solid" borderRadius="lg" overflow="hidden">
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </Box>
  )
}
```

少し雑だが最終的に表示するカードの実装はこんな感じ。

```jsx
const LinkCardCompleted = ({ ogData: OgData }) => {
  return (
    <Box border="1px solid" borderRadius="lg" overflow="hidden">
      <Link href={ogData.url} isExternal>
        <HStack>
          {ogData.image && (
            <Box maxW="38%" h={['20', '20', '28']}>
              <Image
                src={ogData.image}
                alt={ogData.siteName}
                width="full"
                height="full"
                objectFit="cover"
              />
            </Box>
          )}
          <Flex direction="column" flex={1}>
            <Text
              fontSize={['xs', 'xs', 'sm']}
              fontWeight="bold"
              wordBreak="break-all"
              noOfLines={2}
            >
              {ogData.title}
            </Text>
            <Text fontSize="xs" wordBreak="break-all" noOfLines={2}>
              {ogData.description}
            </Text>
          </Flex>
        </HStack>
      </Link>
    </Box>
  )
}
```

[前の記事](https://tuka.dev/entry/site-was-destructively-renewed#%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E6%8A%80%E8%A1%93)で軽く触れたnext-mdx-remoteでReactコンポーネントに変換する部分で、こんな感じでリンクカードのコンポーネントをあてればリンクカードとして表示される。

```jsx
p: (props: any) => {
  if (
    typeof props.children === 'object' &&
    typeof props.children.props === 'object' &&
    props.children.props.href
  ) {
    return <LinkCard {...props.children.props} />
  }
  return <Text as="p" mb="4" lineHeight="140%" {...props} />
},
```

（`<a>`タグであることをきちんと判定した方がよさそう。）

## できあがり

これだけでもこんな具合にリンクカードが表示できる。

```markdown
https://chakra-ui.com/docs/components/skeleton
```

![](/uploads/images/2022-10-25_000000000.png)

## おわりに

改善の余地ありだけど、割といい感じにリンクを表示できるようになったのでひとまず満足。
