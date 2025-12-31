import { generateOGImage, size, contentType } from "@/lib/og-image";
import { readMDXFile } from "@/lib/mdx-utils";
import path from "path";

export { size, contentType };

export default async function Image() {
  const { metadata } = readMDXFile(
    path.join(process.cwd(), "app/poc/0-multiplayer-foundation/page.mdx")
  );
  return generateOGImage({
    label: "POC 00",
    title: metadata?.title?.replace(/^POC \d+:\s*/, "") || "Foundation",
    description: metadata?.description,
  });
}
