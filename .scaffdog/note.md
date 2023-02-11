---
name: 'note'
root: '.'
output: '.'
ignore: []
questions:
  slug:
    'enter slug of entry.'
  title:
    'enter title.'
---

# `src/contents/{{ date "YYYY-MM-DD" }}_{{ inputs.slug }}.md`

```markdown
---
title: '{{ inputs.title }}'
slug: '{{ inputs.slug }}'
description: ''
ogImage: ''
tags:
  - 雑記
publishedAt: '{{ date "YYYY-MM-DDThh:mm:00.000+09:00" }}'
updatedAt: '{{ date "YYYY-MM-DDThh:mm:00.000+09:00" }}'
author: tuka
featured: false
draft: false
---
```
