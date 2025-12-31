import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          color: "white",
          fontFamily: "system-ui, -apple-system",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            maxWidth: "1000px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "8px",
            }}
          >
            Echelon Case Study
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#a0a0a0",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            Building a co-op heist game by designing the post-mortem first
          </div>
          <div
            style={{
              marginTop: "32px",
              padding: "16px 32px",
              border: "2px solid #333",
              borderRadius: "8px",
              fontSize: 24,
              color: "#888",
            }}
          >
            A case study in AI-assisted game development
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
