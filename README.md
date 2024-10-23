# lgtmfy

## これは何？

LGTM 画像を生成する CLI ツールです。 画像 URL をうけとり、LGTM 画像を生成して
Gyazo にアップロードします。

## インストール

```sh
cd lgtmfy
deno install --allow-run --allow-read --allow-env --allow-net --allow-ffi --unstable-ffi -g -f run.ts --name lgtm
```

Gyazo のアクセストークンを環境変数に設定してください。
アクセストークンは[こちら](https://gyazo.com/oauth/applications)から取得できます。

```.env
GYAZO_ACCESS_TOKEN=${YOUR_GYAZO_ACCESS_TOKEN}
```

## 使い方

```sh
lgtm ${IMAGE_URL}
```

生成された画像は、クリップボードにコピーされます。

`deno install`を使わない場合は、本ディレクトリのルートで以下のコマンドを実行してください。

```sh
deno run start ${IMAGE_URL}
```
