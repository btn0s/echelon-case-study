import { generateOGImage, size, contentType } from "@/lib/og-image";
import { readMDXFile } from "@/lib/mdx-utils";
import path from "path";

export { size, contentType };

export default async function Image() {
  const { metadata } = readMDXFile(
    path.join(process.cwd(), "app/poc/4-coop-objectives/page.mdx")
  );
  return generateOGImage({
    label: "POC 04",
    title: metadata?.title?.replace(/^POC \d+:\s*/, "") || "Objectives",
    description: metadata?.description,
  });
}
