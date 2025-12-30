import { readFileSync } from "fs";
import { join } from "path";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function POC0Page() {
  const content = readFileSync(
    join(process.cwd(), "app/poc/0-multiplayer-foundation/page.mdx"),
    "utf-8"
  );

  return <MDXRemote source={content} />;
}
