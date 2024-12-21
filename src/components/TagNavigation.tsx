import Link from 'next/link';
import { encodeSlug, decodeSlug } from '@/lib/posts';

interface TagNavigationProps {
  tags: [string, number][];
  selectedTag?: string;
}

const TagNavigation: React.FC<TagNavigationProps> = ({ tags, selectedTag }) => {
  return (
    <nav className='space-y-1'>
      <h2 className='text-lg font-semibold mb-2'>Tags</h2>
      <ul>
        {tags.map(([tag, count]) => (
          <li key={tag}>
            <Link
              href={`/tags/${encodeSlug(tag)}`}
              className={`block py-1 text-sm hover:text-primary hover:underline ${
                selectedTag === tag ? 'font-semibold text-primary' : ''
              }`}>
              #{decodeSlug(tag)}{' '}
              <span className='text-gray-500 dark:text-gray-400'>({count})</span>
            </Link>
            <div className='border-t border-gray-200 dark:border-gray-700 my-1' />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TagNavigation;
