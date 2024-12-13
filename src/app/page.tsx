import Link from 'next/link';
import { getPostTree, PostTree, Post } from '@/lib/posts';

function renderPostTree(tree: PostTree, level: number = 0) {
  return (
    <ul className={`space-y-1 ${level > 0 ? 'ml-4' : ''}`}>
      {tree.children.map((item, index) => (
        <li key={index}>
          {'children' in item ? (
            <>
              <span className='font-semibold'>{item.name}</span>
              {renderPostTree(item, level + 1)}
            </>
          ) : (
            <Link href={`/posts/${item.slug}`} className='text-sm hover:underline'>
              {item.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function renderPostList(posts: Post[]) {
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
          <span
            key={tag}
            className='inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2'>
            #{tag}
          </span>
        ))}
      </div>
    </article>
  ));
}

export default async function Home() {
  const postTree = await getPostTree();

  return (
    <div className='container grid grid-cols-[200px_1fr] gap-12 px-8 py-8'>
      <aside className='w-[200px]'>
        <nav className='flex flex-col space-y-1'>{renderPostTree(postTree)}</nav>
      </aside>
      <main>
        <h1 className='text-3xl font-bold mb-6'>Latest Posts</h1>
        <div className='grid gap-4'>
          {renderPostList(
            postTree.children.filter((item): item is Post => !('children' in item))
          )}
        </div>
      </main>
    </div>
  );
}
