import * as mod from "https://deno.land/std@0.203.0/dotenv/mod.ts";

await mod.load({ export: true });

const defaultFontFamily = "M PLUS Rounded 1c";

export const getFont = async (fontFamily = defaultFontFamily) => {
  const apiKey = Deno.env.get("GOOGLE_FONTS_API_KEY");

  if (!apiKey) {
    throw new Error("GOOGLE_FONTS_API_KEY is not set");
  }

  const endpoint = new URL("https://www.googleapis.com/webfonts/v1/webfonts");
  endpoint.searchParams.set("family", fontFamily);
  endpoint.searchParams.set("key", apiKey);

  const fontInfo = await fetch(endpoint).then((res) => res.json());
  const fontResponse = await fetch(fontInfo.items[0].files["800"]);
  const fontBuffer = await fontResponse.arrayBuffer();

  return {
    name: fontFamily,
    buffer: fontBuffer,
  };
};
