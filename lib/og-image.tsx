import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface OGData {
  title: string;
  description?: string;
  label?: string;
}

export function generateOGImage(data: OGData) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {data.label && (
          <div
            style={{
              fontSize: 24,
              color: "#444",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 24,
            }}
          >
            {data.label}
          </div>
        )}
        <div
          style={{
            fontSize: 100,
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          {data.title}
        </div>
        {data.description && (
          <div
            style={{
              fontSize: 36,
              color: "#888",
              marginTop: 32,
              maxWidth: "900px",
              lineHeight: 1.2,
            }}
          >
            {data.description}
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
