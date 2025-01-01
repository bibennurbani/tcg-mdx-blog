import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'View the latest updates and changes to our blog.',
};

async function getChangelogContent() {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  const fileContents = fs.readFileSync(changelogPath, 'utf8');
  return fileContents;
}

export default async function ChangelogPage() {
  const changelogContent = await getChangelogContent();

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Changelog</h1>
      <div className='prose dark:prose-invert max-w-none'>
        <MDXRemote source={changelogContent} />
      </div>
    </div>
  );
}
