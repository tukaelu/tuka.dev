---
title: 'WindowsのレジストリからPowerShellでアンインストールコマンドを取得する'
slug: get-uninstall-command-from-windows-registry
description: Windowsでインストール済みソフトウェア一覧に、アンインストールしたいソフトが見つからない場合の対処方法のひとつを書きました。
ogImage: ''
tags:
  - メモ
  - Windows
publishedAt: '2023-02-02T10:00:00.000+09:00'
updatedAt: '2023-02-02T10:00:00.000+09:00'
author: tuka
featured: false
draft: false
---

Windows環境でインストーラーによってインストールしたソフトウェアが「プログラムの追加と削除」に表示されないことが稀にあるらしい。

- [インストール後に \[プログラムの追加と削除\] にプログラムが表示されない - Microsoft サポート](https://support.microsoft.com/ja-jp/topic/%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E5%BE%8C%E3%81%AB-%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0%E3%81%AE%E8%BF%BD%E5%8A%A0%E3%81%A8%E5%89%8A%E9%99%A4-%E3%81%AB%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0%E3%81%8C%E8%A1%A8%E7%A4%BA%E3%81%95%E3%82%8C%E3%81%AA%E3%81%84-0866db2a-f8d9-fb0f-16d2-850f5072e536)

このようなソフトウェアをアンインストールする方法として、Microsoftの公式記事には次の3つの方法が記載されていた。

- プログラムをアンインストールする
- アンインストールフォルダに含まれているアンインストールプログラムを実行する
- レジストリに表示されるアンインストールコマンドを使用する

このうち3つ目のレジストリを参照する方法で対応する場合、参照だけとはいえregeditを直接触るのは若干怖い。

たぶんPowerShellでも取れるやろということで調べてみたら次のような感じでいけるケースがありそうだった。

## PowerShellでレジストリからアンインストールコマンドを取得してアンインストールする

例としてmackerel-agentの場合を紹介する。

### レジストリキーを取得する

まずはレジストリキーを取得する必要がある。

```powershell
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall
```

上記のパス配下のレジストリ値にソフトウェア名などが登録されていれば、次のようなコマンドを実行するとキーを知ることができる。

(`HKEY_LOCAL_MACHINE`は`HKLM`のように省略できる。)

```powershell:mackerel-agentを含むレジストリを検索する
reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" /f mackerel-agent /s
```

mackerel-agentは`DisplayName`の値にそれを含んでいるようなので、次のような結果が返ってくる。

```powershell
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{5BF7694F-2891-4383-B2F7-52E6FAFADDC2}
    DisplayName    REG_SZ    mackerel-agent
```

この結果の`{5BF7694F-2891-4383-B2F7-52E6FAFADDC2}`がレジストリキー。

### レジストリキーの配下のUninstallStringを取得する

レジストリキー配下の`UninstallString`の取得するには以下のコマンドを実行する。

```powershell
reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{5BF7694F-2891-4383-B2F7-52E6FAFADDC2}" /v UninstallString
```

次のような結果が返ってくる。

```powershell
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{5BF7694F-2891-4383-B2F7-52E6FAFADDC2}
    UninstallString    REG_EXPAND_SZ    MsiExec.exe /X{5BF7694F-2891-4383-B2F7-52E6FAFADDC2}
```

### UninstallStringを実行する

上記の結果から、プログラムの追加と削除からアンインストールを行うと`MsiExec.exe /X{5BF7694F-2891-4383-B2F7-52E6FAFADDC2}`が実行されている模様。

コマンドプロンプトなどから上記のコマンドを実行すると、プログラムの追加と削除にソフトウェアが表示されない場合でもアンインストールできるようだ。

```powershell
MsiExec.exe /X{5BF7694F-2891-4383-B2F7-52E6FAFADDC2}
```

## まとめ

regeditでやらかすことなく（実際はそんなことなさそうな気もする）、`reg query`という参照コマンドだけで安心してレジストリを覗くことができた。

Windows何もわからん…
