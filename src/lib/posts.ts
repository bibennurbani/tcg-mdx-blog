import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  draft: boolean;
  summary: string;
}

export function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: filename.replace('.mdx', ''),
        title: data.title,
        date: data.date,
        tags: data.tags,
        draft: data.draft,
        summary: data.summary,
      };
    })
    .filter((post) => !post.draft) // Filter out draft posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date

  return posts;
}
