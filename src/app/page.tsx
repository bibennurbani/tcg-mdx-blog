import Link from 'next/link';
import { getPosts } from '@/lib/posts';

export default function Home() {
  const posts = getPosts();

  return (
    <div className='container grid grid-cols-[200px_1fr] gap-12 px-8 py-8'>
      <aside className='w-[200px]'>
        <nav className='flex flex-col space-y-1'>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='text-sm hover:underline'>
              {post.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main>
        <h1 className='text-3xl font-bold mb-6'>Latest Posts</h1>
        <div className='grid gap-4'>
          {posts.map((post) => (
            <article
              key={post.slug}
              className='group relative rounded-lg border p-6 hover:shadow'>
              <h2 className='text-2xl font-semibold mb-2'>
                <Link href={`/blog/${post.slug}`} className='hover:underline'>
                  {post.title}
                </Link>
              </h2>
              <time className='block text-xs text-gray-600 dark:text-gray-400 mb-2'>
                {post.date}
              </time>
              <p className='text-muted-foreground'>{post.summary}</p>
              <div className='mt-4'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2'>
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
