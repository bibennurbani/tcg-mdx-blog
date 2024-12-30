import { getPostTree, getAllPosts, Post } from '@/lib/posts';
import PostNavigation from '@/components/PostNavigation';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to My Blog - Explore the latest posts on web development and technology.',
};

function renderPostList(posts: Post[]) {
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return posts.map((post) => (
    <article
      key={post.slug}
      className='group relative rounded-lg border p-6 hover:shadow'>
      <h2 className='text-2xl font-semibold mb-2'>
        <Link href={`/posts/${post.slug}`} className='hover:underline'>
          {post.title}
        </Link>
      </h2>
      <time className='block text-xs text-gray-600 dark:text-gray-400 mb-2'>
        {post.date}
      </time>
      <p className='text-muted-foreground'>{post.summary}</p>
      <div className='mt-4'>
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className='inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2 hover:bg-gray-300 dark:hover:bg-gray-600'>
            #{tag}{' '}
            <span className='text-gray-500 dark:text-gray-400'>({tagCounts[tag]})</span>
          </Link>
        ))}
      </div>
    </article>
  ));
}

export default async function Home() {
  const postTree = await getPostTree();
  const allPosts = await getAllPosts();

  return (
    <div className='grid grid-cols-[200px_1fr] gap-12'>
      <aside className='w-[200px]'>
        <PostNavigation tree={postTree} />
      </aside>
      <main>
        <h1 className='text-3xl font-bold mb-6'>Latest Posts</h1>
        <div className='grid gap-4'>{renderPostList(allPosts)}</div>
      </main>
    </div>
  );
}
