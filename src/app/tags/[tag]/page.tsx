import { getAllPosts, Post } from '@/lib/posts';
import TagNavigation from '@/components/TagNavigation';
import Link from 'next/link';
import { encodeSlug, decodeSlug } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  return tags.map((tag) => ({ tag: encodeSlug(tag) }));
}

interface TagPageProps {
  params: { tag: string };
}

export default async function TagPage({ params }: TagPageProps) {
  const decodedTag = decodeSlug(params.tag);
  const posts = await getAllPosts();
  const tagPosts = posts.filter((post) => post.tags.includes(params.tag));

  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((t) => {
      const decodedT = decodeSlug(t);
      acc[decodedT] = (acc[decodedT] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className='grid grid-cols-[200px_1fr] gap-12'>
      <aside className='w-[200px]'>
        <TagNavigation tags={sortedTags} selectedTag={decodedTag} />
      </aside>
      <main>
        <h1 className='text-3xl font-bold mb-6'>
          Posts tagged with #{decodedTag}{' '}
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
      </main>
    </div>
  );
}
