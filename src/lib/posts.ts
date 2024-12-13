import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  draft: boolean;
  summary: string;
  content: string;
}

export interface PostTree {
  name: string;
  path: string;
  children: (PostTree | Post)[];
}

async function readDirectory(dir: string): Promise<PostTree> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const children: (PostTree | Post)[] = [];

  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      children.push(await readDirectory(res));
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      const fileContents = await fs.readFile(res, 'utf8');
      const { data, content } = matter(fileContents);
      if (!data.draft) {
        children.push({
          slug: path
            .relative(path.join(process.cwd(), 'public', 'posts'), res)
            .replace('.mdx', ''),
          title: data.title,
          date: data.date,
          tags: data.tags,
          draft: false,
          summary: data.summary,
          content: content,
        });
      }
    }
  }

  return {
    name: path.basename(dir),
    path: path.relative(path.join(process.cwd(), 'public', 'posts'), dir),
    children: children.sort((a, b) => {
      if ('date' in a && 'date' in b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    }),
  };
}

export async function getPostTree(): Promise<PostTree> {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  return await readDirectory(postsDirectory);
}

export async function getAllPosts(): Promise<Post[]> {
  const tree = await getPostTree();
  const posts: Post[] = [];

  function flattenTree(node: PostTree | Post) {
    if ('children' in node) {
      for (const child of node.children) {
        flattenTree(child);
      }
    } else {
      posts.push(node);
    }
  }

  flattenTree(tree);
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}
