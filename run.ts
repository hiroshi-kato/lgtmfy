import { Command } from "@cliffy/command";
import { $ } from "@david/dax";
import { copyPngToClipboard } from "./src/clipboardImage.ts";
import { renderLGTM } from "./src/generateLgtmImage.tsx";
import { uploadToGyazo } from "./src/gyazo.ts";

export const runLgtmfy = async (): Promise<void> => {
  await new Command()
    .name("lgtmfy")
    .version("0.1.0")
    .description("Generate LGTM image from image URL")
    .arguments("<imageUrl:string>")
    .action(async (_options, ...args) => {
      const imageUrl = args[0].replace(/\?.+$/, "");
      if (!imageUrl.match(/\.(jpeg|jpg|png|gif|webp)$/)) {
        await $`echo "Invalid image URL. Please provide a valid image URL."`;
        return;
      }

      // LGTM画像をPNGバッファとして生成
      const pngBuffer = await renderLGTM(imageUrl);

      // 画像をクリップボードにコピー
      try {
        await copyPngToClipboard(pngBuffer);
        await $`echo "LGTM画像をクリップボードにコピーしました！"`;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await $`echo "クリップボードへのコピーに失敗しました: ${message}"`;
      }

      // Gyazoにアップロード（エラーが発生しても続行）
      try {
        const json = await uploadToGyazo(pngBuffer);
        const markdown = `![LGTM](${json.url})`;
        await $`echo "\nGyazo URL: ${json.url}"`;
        await $`echo "Markdown: ${markdown}"`;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        await $`echo "\nGyazoアップロードに失敗しました: ${message}"`;
      }
    })
    .parse(Deno.args);
};

runLgtmfy();
