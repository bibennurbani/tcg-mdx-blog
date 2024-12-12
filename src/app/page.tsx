import Link from 'next/link';
import { getPosts } from '@/lib/posts';

export default function Home() {
  const posts = getPosts();

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h2 className='text-3xl font-bold mb-6'>Welcome to My Blog</h2>
      <div className='space-y-6'>
        {posts.map((post) => (
          <div key={post.slug} className='bg-white p-6 rounded-lg shadow-md'>
            <Link
              href={`/posts/${post.slug}`}
              className='text-xl font-semibold text-blue-600 hover:underline'>
              {post.title}
            </Link>
            <p className='text-gray-600 mt-2'>{post.date}</p>
            <p className='mt-2'>{post.summary}</p>
            <div className='mt-4'>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
