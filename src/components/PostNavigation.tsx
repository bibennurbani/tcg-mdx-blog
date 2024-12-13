'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { PostTree, Post } from '@/lib/posts';

interface PostNavigationProps {
  tree: PostTree;
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

  const renderTree = (node: PostTree | Post, level: number = 0) => {
    if ('children' in node) {
      const isExpanded = expandedFolders.has(node.path);
      return (
        <li key={node.path}>
          <button
            onClick={() => toggleFolder(node.path)}
            className='flex items-center space-x-1 text-sm font-medium hover:text-primary'>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span>{node.name}</span>
          </button>
          {isExpanded && (
            <ul className='ml-4 mt-1 space-y-1'>
              {node.children.map((child) => renderTree(child, level + 1))}
            </ul>
          )}
        </li>
      );
    } else {
      return (
        <li key={node.slug}>
          <Link
            href={`/posts/${node.slug}`}
            className='text-sm hover:text-primary hover:underline'>
            {node.title}
          </Link>
        </li>
      );
    }
  };

  return <nav className='space-y-1'>{renderTree(tree)}</nav>;
};

export default PostNavigation;
