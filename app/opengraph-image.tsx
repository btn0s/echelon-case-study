import { generateOGImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOGImage({
    title: "Echelon",
    description: "Building a co-op heist game by designing the post-mortem first.",
  });
}
