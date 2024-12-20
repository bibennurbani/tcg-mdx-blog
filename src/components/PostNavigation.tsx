'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { PostTreeRoot, PostTree, Post } from '@/lib/posts';

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

  const renderPost = (post: Post) => (
    <li key={post.slug}>
      <Link
        href={`/posts/${post.slug}`}
        className='text-sm hover:text-primary hover:underline'>
        {post.title}
      </Link>
    </li>
  );

  const renderFolder = (folder: PostTree, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.path);
    return (
      <li key={folder.path}>
        <button
          onClick={() => toggleFolder(folder.path)}
          className='flex items-center space-x-1 text-sm font-medium hover:text-primary'>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span>{folder.name}</span>
        </button>
        {isExpanded && (
          <ul className='ml-4 mt-1 space-y-1'>
            {folder.children.map((child) =>
              'children' in child ? renderFolder(child, level + 1) : renderPost(child)
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className='space-y-1'>
      <ul>
        {tree.topLevelMdx.map(renderPost)}
        {tree.folders.map((folder) => renderFolder(folder))}
      </ul>
    </nav>
  );
};

export default PostNavigation;
