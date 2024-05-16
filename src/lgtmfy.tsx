import satori from "https://esm.sh/satori@0.10.13";
import { Resvg } from "npm:@resvg/resvg-js";
import { Command } from "jsr:@cliffy/command@1.0.0-rc.4";
import * as clippy from "https://deno.land/x/clippy@v1.0.0/mod.ts";
import { Template } from "./Template.tsx";

export const lgtmfy = async () =>
  await new Command()
    .name("lgtmfy")
    .version("0.1.0")
    .description("Generate LGTM image from image URL")
    .arguments("<imageUrl:string>")
    .action(async (options, ...args) => {
      const imageUrl = args[0];
      const svg = await satori(<Template imageUrl={imageUrl} />, {
        width: 600,
        height: 400,
        fonts: [
          {
            name: "Roboto-Regular",
            data: await Deno.readFile("./fonts/Roboto-Regular.ttf"),
          },
        ],
      });

      const resvg = new Resvg(svg, {
        fitTo: {
          mode: "width",
          value: 600,
        },
      });
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      await clippy.writeImage(pngBuffer);
      console.log("Image generated at clipboard!");
    })
    .parse(Deno.args);
