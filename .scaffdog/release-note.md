---
name: 'release notes'
root: '.'
output: '.'
ignore: []
questions:
  month:
    message: 'Input entry month: [1-12]'
---

# `src/contents/{{ date "YYYY-MM-DD" }}_release-notes-v4.0.{{ s2n(inputs.month) < 10 ? (s2n(inputs.month) + 2) : (s2n(inputs.month) - 10) }}.md`

```markdown
---
title: 'Release Notes v4.0.{{ s2n(inputs.month) < 10 ? (s2n(inputs.month) + 2) : (s2n(inputs.month) - 10) }} ({{ date "YYYY-MM" }})'
slug: 'release-notes-v4.0.{{ s2n(inputs.month) < 10 ? (s2n(inputs.month) + 2) : (s2n(inputs.month) - 10) }}'
description: ''
ogImage: ''
tags:
  - ReleaseNotes
publishedAt: '{{ date "YYYY-MM-DDThh:mm:00.000+09:00" }}'
updatedAt: '{{ date "YYYY-MM-DDThh:mm:00.000+09:00" }}'
author: tuka
featured: false
draft: false
---

## 今月のハイライト

-

## イベント

-

## 書籍

-

## 買い物

-

## YOT - ふりかえり

### Y: よかったこと

-

### O: おもったこと

-

### T: つぎやること

-
```
