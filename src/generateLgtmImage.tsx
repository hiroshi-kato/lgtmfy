import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { uploadToGyazo } from "./gyazo.ts";
import { Template } from "./Template.tsx";

const __dirname = new URL(".", import.meta.url).pathname;
const fontPath = `${__dirname}fonts/DelaGothicOne-Regular.ttf`;

/**
 * LGTM画像をPNGバッファとして生成する
 * @param imageUrl ベース画像のURL
 * @returns PNG画像のUint8Arrayバッファ
 */
export const renderLGTM = async (imageUrl: string): Promise<Uint8Array> => {
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

  return pngBuffer;
};

/**
 * LGTM画像を生成し、GyazoにアップロードしてURLを返す（後方互換性のため保持）
 * @param imageUrl ベース画像のURL
 * @returns Gyazoアップロード後のURL
 */
export const generateLGTMImage = async (imageUrl: string): Promise<string> => {
  const pngBuffer = await renderLGTM(imageUrl);
  const json = await uploadToGyazo(pngBuffer);
  return json.url;
};
