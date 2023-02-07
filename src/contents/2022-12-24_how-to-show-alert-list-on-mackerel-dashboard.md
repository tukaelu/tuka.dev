---
title: Mackerelのカスタムダッシュボードにアラートの一覧を表示する
slug: how-to-show-alert-list-on-mackerel-dashboard
description: MackerelのAPIを使ってカスタムダッシュボードに欲しいけど『ない』機能を補う代替機能の作り方を紹介したいと思います。
ogImage: ''
tags:
  - Mackerel
  - AdventCalendar
publishedAt: '2022-12-24T00:00:00.000+09:00'
updatedAt: '2022-12-24T00:00:00.000+09:00'
author: tuka
featured: true
draft: false
---

:point_down: はてなブログに投稿した記事のクローンです。 :point_down:

https://tukaelu.hatenablog.jp/entry/2022/12/24/000000

---

このエントリは[Mackerel Advent Calendar 2022](https://qiita.com/advent-calendar/2022/mackerel)の24日目の記事です。

本エントリでは、MackerelのAPIを使ってカスタムダッシュボードに欲しいけど『ない』機能を補う代替機能のアイデアを紹介したいと思います。

## TL;DR

- Mackerel API, mkr, jqを使って、カスタムダッシュボードにアラート一覧を実装する方法を紹介します。
- 主にシェル芸です。

## カスタムダッシュボードのご紹介

Mackerelには、監視の運用に合わせたオリジナルのダッシュボードが実装できる[カスタムダッシュボード](https://mackerel.io/my/dashboards)があります。

https://mackerel.io/ja/docs/entry/howto/dashboard

カスタムダッシュボードには以下の4種類のウィジェットが用意されているので、これらを組み合わせることでより自由度の高いダッシュボードを構成できます。

- グラフウィジェット
  - 各種グラフが表示できる
- 数値ウィジェット
  - 各種メトリックの最新の値を数値で表示できる
- Markdownウィジェット
  - Markdown形式で自由に内容を記述できる
- アラートステータスウィジェット
  - 特定のロールに所属しているすべてのホストのアラートステータスを表示できる
    <br />

この4つのウィジェットだけでもダッシュボードを構成するのに充分ですが、ここにはないウィジェットで、次のようなウィジェットのご要望をよくいただきます。

- 画像を表示するウィジェット
- アラート一覧を表示するウィジェット
  <br />

どちらも2022年時点では対応していないのですが、アラートの一覧についてはMarkdownウィジェットで代用できそうなので、実装してみることにしました。

## 実装していく

この記事では主にLinux環境で動かすことを想定して、bashで実装します。他の環境、言語でももちろん実装できるので参考になればと思います。

### 必要なもの

bashやcurl以外に以下を事前にインストールしてください。

- [mkr](https://github.com/mackerelio/mkr)
- [jq](https://stedolan.github.io/jq/)
  <br />

mkrのインストールはヘルプの手順が参考になります。

https://mackerel.io/ja/docs/entry/advanced/cli

### ダッシュボードを取得する

アラート一覧を表示したいダッシュボードを取得します。

あらかじめダッシュボードには、アラート一覧用のMarkdownウィジェットを登録しておいてください。

ダッシュボードの取得は、[ダッシュボード取得 API](https://mackerel.io/ja/api-docs/entry/dashboards#get)、mkrのどちらでもできます。

```shell
mkr dashboards pull
```

mkrの場合、カレントディレクトリに`dashboards-<ダッシュボードID>.json`が保存されます。ただ今回はローカルにファイルを残したくなかったので、curlでAPIを叩くようにします。

```shell
curl \
-X GET \
-s https://api.mackerelio.com/api/v0/dashboards/${DASHBOARD_ID} \
-H "Content-Type: application/json" \
-H "X-Api-Key: ${API_KEY}" \
-f
```

ダッシュボードの構成に合わせて、次のようなJSONがレスポンスされます。

```json
{
  "id": "xxxxxxxxxxx",
  "title": "毎日見たいダッシュボード",
  "urlPath": "xxxxxxxxxxx",
  "createdAt": 1234567890,
  "updatedAt": 1234567890,
  "memo": "",
  "widgets": [
    {
      "type": "markdown",
      "title": "直近のアラート",
      "layout": {
        "x": 0,
        "y": 0,
        "width": 12,
        "height": 6
      },
      "metric": null,
      "graph": null,
      "range": null,
      "markdown": "ここにアラートの一覧を表示する。"
    },
    {
      "type": "markdown",
      "title": "別のMarkdownウィジェット",
      "layout": {
        "x": 12,
        "y": 0,
        "width": 12,
        "height": 6
      },
      "metric": null,
      "graph": null,
      "range": null,
      "markdown": "こっちは更新されたくない。"
    }
  ]
}
```

このダッシュボードには2つのMarkdownウィジェットが登録されていて、今回は「直近のアラート」というタイトルがつけられた方のウィジェットに対してアラート一覧を反映します。

ちなみにダッシュボードにはユニークに払い出されたIDを持ちますが、ウィジェットにはIDが払い出されません。そのため、ウィジェットの`title`をキーとして使用します。

### アラートの一覧を取得する

現在オープンしているアクティブなアラートを取得します。

アラートの取得は[アラート取得 API](https://mackerel.io/ja/api-docs/entry/alerts#get)からできますが、 mkrを使うと次のような感じでいい感じにフォーマットされた内容が取得できます。

```shell
mkr alerts list
```

```log
4Hrxxxxxx79 2022-12-07 03:10:32 CRITICAL  死活監視 IP-xxxxxxxx working [Service:Role]
4HrxxxxxxX3 2022-12-07 02:55:24 WARNING  Service - Windows - CPU % cpu% 0.00 > 70.00 IP-xxxxxxxx working [Service:Role]
4HaxxxxxxSm 2022-12-01 14:47:30 CRITICAL  Event Log CRITICAL: 0 warnings, 1 criticals. EC2AMAZ-xxxxxxx working [Service:Role]
```

アラートID、発生日時、アラートレベル、メッセージなどが含まれるので、今回はこれをそのまま使用します。

この結果をもとに、次のようにMarkdownでリスト化して各アイテムにアラートへのリンクを貼ることで、ダッシュボードからアラートを開けるので便利になりそうです。

```markdown
- [アラートの情報](アラートへのリンク)
- [アラートの情報](アラートへのリンク)
  :
```

mkr alerts listの結果のうち、アラートIDはリンクに、それ以外をアラート情報として一覧に表示する形式にしたいですが、awkを使うことで簡単に整形できます。

```shell
mkr alerts list | awk '{m="";for(i=2;i<=NF;i++) m=m $i " "; print "- [" m "](https://mackerel.io/orgs/オーガニゼーション名/alerts/" $1 ")"}'
```

```markdown
- [2022-12-07 03:10:32 CRITICAL 死活監視 IP-xxxxxxxx working [Service:Role] ](https://mackerel.io/orgs/xxx/alerts/4Hrxxxxxx79)
- [2022-12-07 02:55:24 WARNING Service - Windows - CPU % cpu% 0.00 > 70.00 IP-xxxxxxxx working [Service:Role] ](https://mackerel.io/orgs/xxx/alerts/4HrxxxxxxX3)
- [2022-12-01 14:47:30 CRITICAL Event Log CRITICAL: 0 warnings, 1 criticals. EC2AMAZ-xxxxxxx working [Service:Role] ](https://mackerel.io/orgs/xxx/alerts/4HaxxxxxxSm)
```

この結果をMarkdownウィジェットに反映していきましょう！

### ダッシュボードを更新する

取得したダッシュボードのJSONのうち、以下の条件にあてはまる要素の内容を生成したアラート一覧の内容で書き換えます。

- `type`が`markdown`
- `title`が`直近のアラート`
  <br />

ここで役に立つのが`jq`です。次のように`|=`で代入することで内容を書き換えることができます。

```shell
jq '(.widgets[] | select(.type == "markdown" and .title == "直近のアラート") | .markdown) |= "整形されたアラート一覧のMarkdown"'`
```

これを[ダッシュボード更新 API](https://mackerel.io/ja/api-docs/entry/dashboards#update)から定期的に更新することで、カスタムダッシュボードにアラート一覧を表示できます。

### 完成したスクリプト

これらを組み合わせたBashスクリプトが次のようになります。

```shell
#!/bin/bash

API_KEY=APIキー
ORG_NAME=オーガニゼーション名
DASHBOARD_ID=ダッシュボードID
WIDGETS_TITLE=直近のアラート

result=0

# ダッシュボードの取得
DASHBOARD_JSON=$( \
  curl \
    -X GET \
    -s https://api.mackerelio.com/api/v0/dashboards/${DASHBOARD_ID} \
    -H "Content-Type: application/json" \
    -H "X-Api-Key: ${API_KEY}" \
    -f \
) || result=$?

if [ "$result" -ne 0 ]; then
  echo "failed to retrieve dashboard."
  exit 1
fi

# アラート一覧の取得
ALERT_LIST=$( \
  mkr alerts list | \
  awk \
    -v ORG_NAME=${ORG_NAME} \
    '{m="";for(i=2;i<=NF;i++) m=m $i " "; print "- [" m "](https://mackerel.io/orgs/" ORG_NAME "/alerts/" $1 ")"}' \
) || result=$?

if [ "$result" -ne 0 ]; then
  echo "failed to retrieve the alert list."
  exit 1
fi

# アラート一覧のMarkdownウィジェットを修正
MODIFIED_JSON=$( \
  echo $DASHBOARD_JSON | \
  jq -c \
    --arg ALERT_LIST "$ALERT_LIST" \
    --arg WIDGETS_TITLE "$WIDGETS_TITLE" \
    '(.widgets[] | select(.type == "markdown" and .title == $WIDGETS_TITLE) | .markdown) |= $ALERT_LIST' \
) || result=$?

if [ "$result" -ne 0 ]; then
  echo "failed to correct dashboard."
  exit 1
fi

# ダッシュボードの更新
curl \
  -X PUT \
  -s https://api.mackerelio.com/api/v0/dashboards/${DASHBOARD_ID} \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: ${API_KEY}" \
  -d "${MODIFIED_JSON}" \
  -f \
  > /dev/null 2>&1 \
|| result=$?

if [ "$result" -ne 0 ]; then
  echo "failed to update dashboard."
  exit 1
fi
```

API_KEY, ORG_NAME, DASHBOARD_ID, WIDGETS_TITLEは環境に応じて設定してください。

これをcronで定期的に実行することで、最新のアラート一覧をこんな感じでダッシュボード上に反映できるようになるはずです！

![](/uploads/images/2022-12-24_20221224000000.png)

## まとめ

いかがでしたでしょうか。

今回は主にLinux環境を想定してシェルで実装していますが、Windows環境だとPowerShellで実装したり、AWS Lambdaなどサーバーレスな環境でも実装できると思います。

アイデア次第で色々と拡張できるので、ぜひ色々と試してみてください！

明日はアドベントカレンダー最終日、[id:wtatsuru](https://wtatsuru.hatenadiary.com/)さんです！お楽しみに！
