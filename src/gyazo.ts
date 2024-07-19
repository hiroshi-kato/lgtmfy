const END_POINT = "https://upload.gyazo.com/api/upload";
import * as mod from "https://deno.land/std@0.203.0/dotenv/mod.ts";

await mod.load({ export: true });

export const uploadToGyazo = async (image?: Uint8Array) => {
  if (!image) throw new Error("image is required");
  const token = Deno.env.get("GYAZO_ACCESS_TOKEN");
  if (!token) throw new Error("GYAZO_ACCESS_TOKEN is required");

  const formData = new FormData();
  formData.append("imagedata", new Blob([image]));
  formData.append("access_token", token);
  formData.append("desc", "#lgtm");

  const res = await fetch(END_POINT, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload to Gyazo");
  }
  return await res.json();
};
