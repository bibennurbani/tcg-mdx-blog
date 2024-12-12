import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { getPosts } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Post({ params }: { params: { slugs: string } }) {
  const { slugs } = params;
  const filePath = path.join(process.cwd(), 'public', 'posts', `${slugs}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  return (
    <article className='max-w-2xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>{data.title}</h1>
      <p className='text-gray-600 mb-4'>{data.date}</p>
      <div className='prose'>
        <MDXRemote source={content} />
      </div>
      <div className='mt-6'>
        {data.tags.map((tag: string) => (
          <span
            key={tag}
            className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
