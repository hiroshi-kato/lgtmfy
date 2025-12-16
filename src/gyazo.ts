import * as mod from "dotenv";

const END_POINT = "https://upload.gyazo.com/api/upload";

await mod.load({ export: true });

export const uploadToGyazo = async (image?: Uint8Array) => {
  if (!image) throw new Error("image is required");
  const token = Deno.env.get("GYAZO_ACCESS_TOKEN");
  if (!token) throw new Error("GYAZO_ACCESS_TOKEN is required");

  const bytes = new Uint8Array(image);
  const formData = new FormData();
  formData.append("imagedata", new Blob([bytes]));
  formData.append("access_token", token);
  formData.append("desc", "#lgtm");
  formData.append("access_policy", "anyone");

  const res = await fetch(END_POINT, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload to Gyazo");
  }
  return await res.json();
};
