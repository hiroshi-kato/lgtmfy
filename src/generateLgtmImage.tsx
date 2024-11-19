import React from "https://esm.sh/react@18.2.0";
import satori from "https://esm.sh/satori@0.10.13";
import { Resvg } from "npm:@resvg/resvg-js";
import { Template } from "./Template.tsx";
import { uploadToGyazo } from "./gyazo.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const fontPath = `${__dirname}fonts/DelaGothicOne-Regular.ttf`;

export const generateLGTMImage = async (imageUrl: string) => {
  const svg = await satori(<Template imageUrl={imageUrl} />, {
    width: 800,
    height: 600,
    fonts: [
      {
        name: "Roboto-Regular",
        data: await Deno.readFile(fontPath),
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 800,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const json = await uploadToGyazo(pngBuffer);
  return json.url;
};
