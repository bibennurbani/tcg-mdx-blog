import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PostProps {
  params: Promise<{ slugs: string[] }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slugs: post.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slugs } = await params;
  const slug = slugs.join('/');
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      authors: ['Biben Nurbani Hasan'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function Post({ params }: PostProps) {
  const { slugs } = await params;
  const slug = slugs.join('/');
  const post = await getPostBySlug(slug);
  const posts = await getAllPosts();

  if (!post) {
    notFound();
  }

  return (
    <div className='container grid grid-cols-[200px_1fr] gap-12 px-8 py-8'>
      <aside className='w-[200px]'>
        <div className='mb-6'>
          <h3 className='font-semibold mb-2'>Author</h3>
          <Link href={'/about'}>Biben Nurbani Hasan</Link>
        </div>
        <div className='mb-6'>
          <h3 className='font-semibold mb-2'>Tags</h3>
          <div className='flex flex-wrap gap-2'>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className='inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200'>
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <nav>
          <h3 className='font-semibold mb-2'>Other Posts</h3>
          <ul className='space-y-1'>
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/posts/${p.slug}`} className='text-sm hover:underline'>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main>
        <article className='prose dark:prose-invert max-w-none'>
          <h1>{post.title}</h1>
          <time className='block text-sm text-gray-600 dark:text-gray-400 mb-4'>
            {post.date}
          </time>
          <MDXRemote source={post.content} />
        </article>
      </main>
    </div>
  );
}

export const revalidate = 86400;
