import { getAllPosts, Post } from '@/lib/posts';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getAllPosts();
  const tagPosts = posts.filter((post) => post.tags.includes(params.tag));

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>
        Posts tagged with #{params.tag}{' '}
        <span className='text-gray-500 dark:text-gray-400'>({tagPosts.length})</span>
      </h1>
      <div className='grid gap-4'>
        {tagPosts.map((post: Post) => (
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
          </article>
        ))}
      </div>
    </div>
  );
}
