import satori from 'https://esm.sh/satori@0.10.13';
import { Resvg } from 'npm:@resvg/resvg-js';
import * as clippy from 'https://deno.land/x/clippy@v1.0.0/mod.ts';
import { Template } from './Template.tsx';
import { uploadToGyazo } from './gyazo.ts';

export const generateLGTMImage = async (imageUrl: string) => {
  const svg = await satori(<Template imageUrl={imageUrl} />, {
    width: 800,
    height: 600,
    fonts: [
      {
        name: 'Roboto-Regular',
        data: await Deno.readFile('./fonts/Roboto-blackItalic.ttf'),
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 800,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const json = await uploadToGyazo(pngBuffer);
  return json.url;
};
