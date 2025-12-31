import { ImageResponse } from "next/og";
import { readMDXFile } from "@/lib/mdx-utils";
import path from "path";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const filePath = path.join(
    process.cwd(),
    "app/poc/integration/page.mdx"
  );
  const { metadata } = readMDXFile(filePath);

  const title = metadata?.title || "Integration & Polish";
  const description = metadata?.description || "";

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
          <div
            style={{
              fontSize: 24,
              color: "#888",
              fontWeight: 500,
              marginBottom: "-8px",
            }}
          >
            Echelon Case Study · POC
          </div>
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
      ...size,
    }
  );
}
