import { generateOGImage, size, contentType } from "@/lib/og-image";
import { readMDXFile } from "@/lib/mdx-utils";
import path from "path";

export { size, contentType };

export default async function Image() {
  const { metadata } = readMDXFile(
    path.join(process.cwd(), "app/poc/7-mission-flow/page.mdx")
  );
  return generateOGImage({
    label: "POC 07",
    title: metadata?.title?.replace(/^POC \d+:\s*/, "") || "Flow",
    description: metadata?.description,
  });
}
