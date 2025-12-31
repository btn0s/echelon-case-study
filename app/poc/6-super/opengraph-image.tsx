import { generateOGImage, size, contentType } from "@/lib/og-image";
import { readMDXFile } from "@/lib/mdx-utils";
import path from "path";

export { size, contentType };

export default async function Image() {
  const { metadata } = readMDXFile(
    path.join(process.cwd(), "app/poc/6-super/page.mdx")
  );
  return generateOGImage({
    label: "POC 06",
    title: metadata?.title?.replace(/^POC \d+:\s*/, "") || "Super",
    description: metadata?.description,
  });
}
