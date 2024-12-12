import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

interface FrontMatter {
  title: string;
  date: string;
}

export default async function BlogList() {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const slug = filename.replace('.mdx', '');

    return {
      slug,
      ...(data as FrontMatter),
    };
  });

  // Sort posts by date
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <ul className='space-y-4'>
      {posts.map((post) => (
        <li key={post.slug} className='border-b pb-4'>
          <Link
            href={`/blog/${post.slug}`}
            className='text-xl font-semibold text-blue-600 hover:underline'>
            {post.title}
          </Link>
          <p className='text-gray-500 text-sm'>
            {new Date(post.date).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  );
}
