export const Template = ({ imageUrl }: { imageUrl: string }) => (
  <div
    style={{ position: "relative", width: 800, height: 600, display: "flex" }}
  >
    <img
      src={imageUrl}
      alt="base"
      style={{ width: 800, height: 600, objectFit: "contain" }}
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
      <p
        style={{
          color: "white",
          fontSize: 100,
          fontWeight: "bold",
          letterSpacing: "1.5rem",
          textShadow: "2px 2px 3px #808080",
        }}
      >
        LGTM
      </p>
    </div>
  </div>
);
