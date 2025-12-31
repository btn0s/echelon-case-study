import { ImageResponse } from "next/og";

export interface OGImageProps {
  title: string;
  description: string;
  subtitle?: string;
}

export function generateOGImage({ title, description, subtitle }: OGImageProps) {
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
          alignItems: "flex-start",
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
            gap: "24px",
            maxWidth: "1000px",
          }}
        >
          {subtitle && (
            <div
              style={{
                fontSize: 24,
                color: "#888",
                fontWeight: 500,
                marginBottom: "-8px",
              }}
            >
              {subtitle}
            </div>
          )}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "8px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a0a0a0",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
