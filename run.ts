import { Command } from "@cliffy/command";
import { $ } from "@david/dax";
import { copyPngToClipboard } from "./src/clipboardImage.ts";
import { copyTextToClipboard } from "./src/clipboardText.ts";
import { renderLGTM } from "./src/generateLgtmImage.tsx";
import { uploadToGyazo } from "./src/gyazo.ts";

type ClipboardMode = "markdown" | "image" | "none";

export const runLgtmfy = async (): Promise<void> => {
  await new Command()
    .name("lgtmfy")
    .version("0.1.0")
    .description("Generate LGTM image from image URL")
    .option(
      "--clipboard <mode:string>",
      "Clipboard output mode: markdown|image|none (default: markdown)",
      { default: "markdown" },
    )
    .arguments("<imageUrl:string>")
    .action(async (options, ...args) => {
      const clipboard = String(
        options.clipboard ?? "markdown",
      ) as ClipboardMode;
      if (!["markdown", "image", "none"].includes(clipboard)) {
        await $`echo "Invalid --clipboard value. Use: markdown|image|none"`;
        return;
      }

      const imageUrl = args[0].replace(/\?.+$/, "");
      if (!imageUrl.match(/\.(jpeg|jpg|png|gif|webp)$/)) {
        await $`echo "Invalid image URL. Please provide a valid image URL."`;
        return;
      }

      // LGTM画像をPNGバッファとして生成
      const pngBuffer = await renderLGTM(imageUrl);

      // クリップボード出力: image
      if (clipboard === "image") {
        try {
          await copyPngToClipboard(pngBuffer);
          await $`echo "LGTM画像をクリップボードにコピーしました！（image）"`;
        } catch (error) {
          const message = error instanceof Error
            ? error.message
            : String(error);
          await $`echo "クリップボードへのコピーに失敗しました（image）: ${message}"`;
        }
      }

      // Gyazoにアップロード（markdownの場合は必須 / それ以外は失敗しても続行）
      if (clipboard === "markdown") {
        try {
          const json = await uploadToGyazo(pngBuffer);
          const markdown = `![LGTM](${json.url})`;
          await $`echo "\nGyazo URL: ${json.url}"`;
          await $`echo "Markdown: ${markdown}"`;

          try {
            await copyTextToClipboard(markdown);
            await $`echo "Markdownをクリップボードにコピーしました！（markdown）"`;
          } catch (error) {
            const message = error instanceof Error
              ? error.message
              : String(error);
            await $`echo "クリップボードへのコピーに失敗しました（markdown）: ${message}"`;
          }
        } catch (error) {
          const message = error instanceof Error
            ? error.message
            : String(error);
          await $`echo "\nGyazoアップロードに失敗しました: ${message}"`;
        }
      } else {
        try {
          const json = await uploadToGyazo(pngBuffer);
          const markdown = `![LGTM](${json.url})`;
          await $`echo "\nGyazo URL: ${json.url}"`;
          await $`echo "Markdown: ${markdown}"`;
        } catch (error) {
          const message = error instanceof Error
            ? error.message
            : String(error);
          await $`echo "\nGyazoアップロードに失敗しました: ${message}"`;
        }
      }
    })
    .parse(Deno.args);
};

runLgtmfy();
