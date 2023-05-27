---
title: Nuxtでnoscriptを使う方法
tags:
  - Web
  - NodeJS
  - Nuxt
  - 備忘録
pubDate: 2023-04-20
---

## はじめに

このブログを作る際に、noscriptタグを使用するのに少してこずったので、備忘録として残しておきます。

~~ちなみに、このブログは `Nuxt v2` で作ってあります。~~

## noscriptとは

HTML内でnoscriptタグを使用すると、JavaScriptが無効の時のみ表示される部分を作ることができます。

具体的には下のようにできます。

```html
...
  <noscript>
    JavaScriptを有効にしてください。
  </noscript>
...
```

こうすると、JSが無効の時のみ、警告を出すことができます。

まあいないと思うけど、

- 「JavaScriptはデータ盗まれる可能性があって危険！絶対無効化！」
- 「スクリプトってなんか危なそう...」

というような人たちに、

「このサイトはJSないと正しく表示できないよ！」

と優しく教えてあげることができます。

まあいないと思うけど。

これは極端な例ですが、実際、ユーザーフレンドリーな設計は大事ですよね。

## 発生した問題

ところが、これをNuxtとかの仮想DOM系のフレームワークで使おうとすると、うまくいかないことがあります。

noscript内はJSで読まれないから、実際のDOMと仮想DOMが噛み合わなくなるのかな。(詳細は知りません。)

このサイトはSSGで、生成時にサーバー側で処理できるので、その時は無視せず、クライアント側でJS無効の場合のみ表示したい。

noscript内でコンポーネントを使いたい。(わがまま)

## 解決する方法

そこで、CSSで制御しようと考えました。

普段は `display: none;` で隠しておき、noscript内にstyleタグを入れて、 `display: inherit;` で元に戻してやりましょう。

以下はNuxt2での対処法です。他のフレームワークに応用する際は、適宜読みかえてください。

### Nuxt2でのやり方

<EmbedLink href="https://nuxtjs.org/docs/concepts/views/#document-apphtml"></EmbedLink>

上のドキュメントによると、プロジェクトのルートディレクトリ(srcDirを設定してる場合はそのディレクトリ)に以下の内容で `app.html` を設置すると、Viewをコントロールできるそうです。

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

これを以下のように変更します。

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    <!-- 追記ここから -->
    <style>.noscript { display: none; }</style>
    <noscript><style>.noscript { display: inherit; } .withscript { display: none; }</style></noscript>
    <!-- 追記ここまで -->
    {{ APP }}
  </body>
</html>
```

追記した2行で、JSの有効or無効で表示を切りかえられるようになりました。

JS無効時にのみ表示したい要素には、 `.noscript` というclassを追加します。

逆に、JS有効時のみ表示したい要素には、 `.withscript` を追加します。

```html
<div class="withscript">
  JSは有効です。
  <SomeComponent>js enabled</SomeComponent>
</div>

<div class="noscript">
  JSは無効です。
  <SomeComponent>js disabled</SomeComponent>
</div>
```

こんな感じで、この方法なら、中にコンポーネントがいる要素でもいけました。

実際に、このブログの検索画面に使われているので、JS無効化して試してみてください。
