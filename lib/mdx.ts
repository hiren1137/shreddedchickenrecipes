import { promises as fs } from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

const REC_DIR = path.join(process.cwd(), 'content', 'recipes');

export async function listSlugs() {
  const files = await fs.readdir(REC_DIR);
  return files.filter((f: string) => f.endsWith('.mdx')).map((f: string) => f.replace(/\.mdx$/, ''));
}

export async function getRecipe(slug: string) {
  const fullPath = path.join(REC_DIR, `${slug}.mdx`);
  const source = await fs.readFile(fullPath, 'utf-8');
  const { data, content } = matter(source);
  const mdx = await serialize(content, { mdxOptions: { remarkPlugins: [] } });
  return { frontMatter: data as any, mdx };
} 