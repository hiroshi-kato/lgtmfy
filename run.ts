import * as clippy from "https://deno.land/x/clippy@v1.0.0/mod.ts";
import { Command } from "jsr:@cliffy/command@1.0.0-rc.4";
import { generateLGTMImage } from "./src/generateLgtmImage.tsx";

export const runLgtmfy = async () =>
  await new Command()
    .name("lgtmfy")
    .version("0.1.0")
    .description("Generate LGTM image from image URL")
    .arguments("<imageUrl:string>")
    .action(async (options, ...args) => {
      const imageUrl = args[0].replace(/\?.+$/, "");
      if (!imageUrl.match(/\.(jpeg|jpg|png|)$/)) {
        console.error("Invalid image URL. Please provide a valid image URL.");
        return;
      }

      const url = await generateLGTMImage(imageUrl);
      const markdown = `![LGTM](${url})`;

      await clippy.writeText(markdown);

      console.log("Image generated at clipboard!");
    })
    .parse(Deno.args);

runLgtmfy();
