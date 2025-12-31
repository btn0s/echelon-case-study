import { generateOGImage, size, contentType } from "@/lib/og-image";
import { getPosts } from "@/lib/mdx-utils";

export { size, contentType };

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPosts(['app', 'poc', 'posts']).find((post) => post.slug === slug);

  if (!post || !post.metadata) {
    return generateOGImage({
      label: "POC",
      title: "Not Found",
    });
  }

  return generateOGImage({
    label: "POC",
    title: post.metadata.title.replace(/^POC \d+:\s*/, "") || "Foundation",
    description: post.metadata.description,
  });
}
