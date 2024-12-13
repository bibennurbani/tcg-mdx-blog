import Link from 'next/link';

const Header = () => {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
        <div className='flex gap-6 md:gap-10'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='inline-block font-bold'>My Blog</span>
          </Link>
          <nav className='flex gap-6'>
            <Link href='/' className='flex items-center text-sm font-medium'>
              Blog
            </Link>
            <Link href='/tags' className='flex items-center text-sm font-medium'>
              Tags
            </Link>
            <Link href='/projects' className='flex items-center text-sm font-medium'>
              Projects
            </Link>
            <Link href='/about' className='flex items-center text-sm font-medium'>
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
