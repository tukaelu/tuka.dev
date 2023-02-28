---
title: Mackerelの補助線はグラフに上限を設けるのに便利
slug: 'auxiliary-line-is-useful-for-setting-upper-limit-on-a-graph'
description: 'Mackerelの補助線にグラフの上限を設定すると便利だなぁという回です。'
ogImage: ''
tags:
  - 雑記
  - Mackerel
publishedAt: '2023-02-28T21:00:00.000+09:00'
updatedAt: '2023-02-28T21:00:00.000+09:00'
author: tuka
featured: false
draft: false
---

## TL;DR

- Mackerelのカスタムダッシュボードのグラフウィジェットで補助線が引けるようになりましたね
- グラフの上限値を設定すると便利ですよ


## 補助線が引けるようになりましたね

少しまえにカスタムダッシュボードのグラフウィジェットで補助線が引けるようになりました。

https://mackerel.io/ja/blog/entry/weekly/20230207

Twitterではよろこびの声を観測しておりました :eyes:

### よろこびの声

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-dnt="true"><p lang="ja" dir="ltr">補助線神機能では<br>カスタムダッシュボードのグラフウィジェットに補助線が引けるようになりました ほか - Mackerel お知らせ <a href="https://twitter.com/hashtag/mackerelio?src=hash&amp;ref_src=twsrc%5Etfw">#mackerelio</a> <a href="https://t.co/mUW47b4972">https://t.co/mUW47b4972</a></p>&mdash; 達人が教えるつぶあん🇺🇦 (@kazeburo) <a href="https://twitter.com/kazeburo/status/1622927447506456581?ref_src=twsrc%5Etfw">February 7, 2023</a></blockquote>

<blockquote class="twitter-tweet" data-dnt="true"><p lang="ja" dir="ltr">！！　これは地味に待望だった機能では！ / 他2件のコメント <a href="https://t.co/kwXY7rCqKv">https://t.co/kwXY7rCqKv</a> “カスタムダッシュボードのグラフウィジェットに補助線が引けるようになりました ほか - Mackerel お知らせ <a href="https://twitter.com/hashtag/mackerelio?src=hash&amp;ref_src=twsrc%5Etfw">#mackerelio</a>” <a href="https://t.co/NjpGvibAWs">https://t.co/NjpGvibAWs</a></p>&mdash; a-know | Daisuke Inoue (@a_know) <a href="https://twitter.com/a_know/status/1622905466413289473?ref_src=twsrc%5Etfw">February 7, 2023</a></blockquote>

<blockquote class="twitter-tweet" data-dnt="true"><p lang="ja" dir="ltr">お、補助線引けるの助かる！！ / 他4件のコメント <a href="https://t.co/hiVdeisQQ7">https://t.co/hiVdeisQQ7</a> “カスタムダッシュボードのグラフウィジェットに補助線が引けるようになりました ほか - Mackerel お知らせ <a href="https://twitter.com/hashtag/mackerelio?src=hash&amp;ref_src=twsrc%5Etfw">#mackerelio</a>” (9 users) <a href="https://t.co/ovz6uuctMN">https://t.co/ovz6uuctMN</a></p>&mdash; MIYA (@kmiya_bbm) <a href="https://twitter.com/kmiya_bbm/status/1623118049539932163?ref_src=twsrc%5Etfw">February 8, 2023</a></blockquote>

<details>
  <summary>他にもたくさんいただきました。（おそらく全部拾いきれていないです。）</summary>
  <blockquote class="twitter-tweet" data-dnt="true"><p lang="ja" dir="ltr">補助線便利そう / 1件のコメント <a href="https://t.co/ZLB9SCbKm0">https://t.co/ZLB9SCbKm0</a> “カスタムダッシュボードのグラフウィジェットに補助線が引けるようになりました ほか - Mackerel お知らせ <a href="https://twitter.com/hashtag/mackerelio?src=hash&amp;ref_src=twsrc%5Etfw">#mackerelio</a>” (1 user) <a href="https://t.co/GRzsdZhoA2">https://t.co/GRzsdZhoA2</a></p>&mdash; すてにゃん (@stefafafan) <a href="https://twitter.com/stefafafan/status/1622891314835755009?ref_src=twsrc%5Etfw">February 7, 2023</a></blockquote>

  <blockquote class="twitter-tweet" data-dnt="true"><p lang="ja" dir="ltr">補助線嬉しい | カスタムダッシュボードのグラフウィジェットに補助線が引けるようになりました ほか - Mackerel お知らせ <a href="https://twitter.com/hashtag/mackerelio?src=hash&amp;ref_src=twsrc%5Etfw">#mackerelio</a> <a href="https://t.co/xVqPRAKM4V">https://t.co/xVqPRAKM4V</a></p>&mdash; ryosukes (@ryosukes47) <a href="https://twitter.com/ryosukes47/status/1623467548481318912?ref_src=twsrc%5Etfw">February 8, 2023</a></blockquote>

  <blockquote class="twitter-tweet" data-dnt="true"><p lang="ja" dir="ltr">補助線便利そう / “カスタムダッシュボードのグラフウィジェットに補助線が引けるようになりました ほか - Mackerel お知らせ <a href="https://twitter.com/hashtag/mackerelio?src=hash&amp;ref_src=twsrc%5Etfw">#mackerelio</a>” <a href="https://t.co/Wf0EL5uB6G">https://t.co/Wf0EL5uB6G</a></p>&mdash; 暗黒たけし・ぶてい (@buty4649) <a href="https://twitter.com/buty4649/status/1622904985674739712?ref_src=twsrc%5Etfw">February 7, 2023</a></blockquote>

  <p>たくさんのコメントありがとうございます！</p>
</details>


## では補助線で何を引くといいの？

> 過去の実績や予想値など、グラフ上で目安となる値を設定して日々の監視にお役立てください。

まあこの通りでしかないんだけど、じゃあ何の線を引くと便利なんだろうというところですね。

引用にある通り、実績値や予想値を補助線として引くのも便利ですが、グラフの上限値を補助線に設定するととても便利です。

割合がわかりやすくて、上限が100%に対してメトリックが低値の場合の見え方がこのように違います。

### 補助線なしでパーセンテージのメトリックを表示

![](/uploads/images/2023-02-28_without-auxiliary-line.png)

メトリックによってグラフの上限も上下してしまいます。

### 補助線を100にしてパーセンテージのメトリックを表示

![](/uploads/images/2023-02-28_with-auxiliary-line.png)

グラフの上限が100に固定されるのでわかりやすくなりました。

## まとめ

これまでは固定値を別のメトリックとして投稿するようなワークアラウンドを取っていたケースもあると思うので、それが解消されますね。

ということで、補助線のちょっと便利な使い方紹介でした。

