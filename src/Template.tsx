import React from "https://esm.sh/react@18.2.0";

export const Template = ({ imageUrl }: { imageUrl: string }) => (
  <div
    style={{ position: "relative", width: 600, height: 400, display: "flex" }}
  >
    <img
      src={imageUrl}
      alt="base image"
      style={{ width: 600, height: 400, objectFit: "contain" }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ color: "white", fontSize: 80, fontWeight: "bold" }}>LGTM</p>
    </div>
  </div>
);
