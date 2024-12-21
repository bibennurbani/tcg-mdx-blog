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

export interface PostTreeRoot {
  topLevelMdx: Post[];
  folders: PostTree[];
}

async function readDirectory(dir: string, basePath: string): Promise<PostTreeRoot> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const topLevelMdx: Post[] = [];
  const folders: PostTree[] = [];

  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    const relativePath = path.relative(basePath, res);

    if (entry.isDirectory()) {
      const subTree = await readDirectory(res, basePath);
      folders.push({
        name: entry.name,
        path: relativePath,
        children: [...subTree.topLevelMdx, ...subTree.folders],
      });
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      const fileContents = await fs.readFile(res, 'utf8');
      const { data, content } = matter(fileContents);
      if (!data.draft) {
        const post: Post = {
          slug: relativePath.replace('.mdx', ''),
          title: data.title,
          date: data.date,
          tags: data.tags,
          draft: false,
          summary: data.summary,
          content: content,
        };
        topLevelMdx.push(post);
      }
    }
  }

  return {
    topLevelMdx: topLevelMdx.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
    folders: folders.sort((a, b) => a.name.localeCompare(b.name)),
  };
}

export async function getPostTree(): Promise<PostTreeRoot> {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  return await readDirectory(postsDirectory, postsDirectory);
}

export async function getAllPosts(): Promise<Post[]> {
  const tree = await getPostTree();
  const posts: Post[] = [];

  function flattenTree(nodes: (PostTree | Post)[]) {
    for (const node of nodes) {
      if ('children' in node) {
        flattenTree(node.children);
      } else {
        posts.push(node);
      }
    }
  }

  posts.push(...tree.topLevelMdx);
  flattenTree(tree.folders);
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}
