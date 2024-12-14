import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default async function TagsPage() {
  const posts = await getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Tags</h1>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className='inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'>
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
