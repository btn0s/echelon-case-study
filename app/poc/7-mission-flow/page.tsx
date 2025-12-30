import { readFileSync } from "fs";
import { join } from "path";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function POCPage() {
  const content = readFileSync(
    join(process.cwd(), "app/poc/7-mission-flow/page.mdx"),
    "utf-8"
  );

  return <MDXRemote source={content} />;
}
