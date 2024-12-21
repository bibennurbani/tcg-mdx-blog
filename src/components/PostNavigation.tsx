'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { PostTreeRoot, PostTree, Post } from '@/lib/posts';
import { decodeSlug } from '@/lib/posts';

interface PostNavigationProps {
  tree: PostTreeRoot;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ tree }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const renderPost = (post: Post, isLast: boolean) => (
    <li key={post.slug}>
      <Link
        href={`/posts/${post.slug}`}
        className='text-sm hover:text-primary hover:underline block py-1'>
        {post.title}
      </Link>
      {!isLast && <div className='border-t border-gray-200 dark:border-gray-700 my-1' />}
    </li>
  );

  const renderFolder = (folder: PostTree, level: number = 0, isLast: boolean) => {
    const isExpanded = expandedFolders.has(folder.path);
    return (
      <li key={folder.path}>
        <button
          onClick={() => toggleFolder(folder.path)}
          className='flex items-center space-x-1 text-sm font-medium hover:text-primary py-1'>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span>{decodeSlug(folder.name)}</span>
        </button>
        {isExpanded && (
          <ul className='ml-4 space-y-1'>
            {folder.children.map((child, index) =>
              'children' in child
                ? renderFolder(child, level + 1, index === folder.children.length - 1)
                : renderPost(child, index === folder.children.length - 1)
            )}
          </ul>
        )}
        {!isLast && (
          <div className='border-t border-gray-200 dark:border-gray-700 my-1' />
        )}
      </li>
    );
  };

  return (
    <nav className='space-y-1'>
      <ul>
        {tree.topLevelMdx.map((post, index) =>
          renderPost(
            post,
            index === tree.topLevelMdx.length - 1 && tree.folders.length === 0
          )
        )}
        {tree.folders.map((folder, index) =>
          renderFolder(folder, 0, index === tree.folders.length - 1)
        )}
      </ul>
    </nav>
  );
};

export default PostNavigation;
