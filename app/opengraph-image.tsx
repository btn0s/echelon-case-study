import { generateOGImage, size, contentType } from "@/lib/og-image";

export { size, contentType };

export default async function Image() {
  return generateOGImage({
    label: "Case Study",
    title: "Echelon: A Game Design Case Study",
    description: "Nine prototypes. One game. Breaking down a complex design problem into answerable questions.",
  });
}
