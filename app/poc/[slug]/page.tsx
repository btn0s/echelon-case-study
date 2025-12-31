import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/lib/mdx-utils";

export async function generateStaticParams() {
  const posts = getPosts(["app", "poc", "posts"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPosts(["app", "poc", "posts"]).find(
    (post) => post.slug === slug
  );
  if (!post || !post.metadata) {
    return {};
  }

  const { title, description } = post.metadata;

  return {
    title,
    description,
  };
}

export default async function POC({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPosts(["app", "poc", "posts"]).find(
    (post) => post.slug === slug
  );

  if (!post || !post.metadata) {
    notFound();
  }

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.metadata.description}
        </p>
      </div>
      <article className="prose prose-sm max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
