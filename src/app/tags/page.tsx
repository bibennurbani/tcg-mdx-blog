import { getAllPosts } from '@/lib/posts';
import TagNavigation from '@/components/TagNavigation';
import Link from 'next/link';

export default async function TagsPage() {
  const posts = await getAllPosts();
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className='grid grid-cols-[200px_1fr] gap-12'>
      <aside className='w-[200px]'>
        <TagNavigation tags={sortedTags} />
      </aside>
      <main>
        <h1 className='text-3xl font-bold mb-6'>All Tags</h1>
        <div className='flex flex-wrap gap-2'>
          {sortedTags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className='inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'>
              #{tag} <span className='text-gray-500 dark:text-gray-400'>({count})</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
