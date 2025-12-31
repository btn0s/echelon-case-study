import { generateOGImage, size, contentType } from "@/lib/og-image";
import { readMDXFile } from "@/lib/mdx-utils";
import path from "path";

export { size, contentType };

export default async function Image() {
  const { metadata } = readMDXFile(
    path.join(process.cwd(), "app/poc/integration/page.mdx")
  );
  return generateOGImage({
    label: "MVP",
    title: metadata?.title?.replace(/^POC \d+:\s*/, "") || "Integration",
    description: metadata?.description,
  });
}
