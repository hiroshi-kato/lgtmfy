# lgtmfy

## これは何？

LGTM 画像を生成する CLI ツールです。

## インストール

```sh
cd lgtmfy
deno install --allow-read --allow-env --allow-net --allow-ffi --unstable-ffi -g -f run.ts --name lgtm
```

## 使い方

```sh
lgtm ${IMAGE_URL}
```

生成された画像は、クリップボードにコピーされます。

`deno install`を使わない場合は、本ディレクトリのルートで以下のコマンドを実行してください。

```sh
deno task start ${IMAGE_URL}
```
