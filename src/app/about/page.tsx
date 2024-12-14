import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>About Me</h1>
      <div className='flex items-center mb-6'>
        <Image
          src='/placeholder.svg?height=200&width=200'
          alt='Author'
          width={200}
          height={200}
          className='rounded-full mr-6'
        />
        <div>
          <h2 className='text-2xl font-semibold mb-2'>John Doe</h2>
          <p className='text-gray-600 dark:text-gray-300'>Web Developer & Blogger</p>
        </div>
      </div>
      <div className='prose dark:prose-invert'>
        <p>
          Hello! I'm John Doe, a passionate web developer and blogger. I love creating
          intuitive and efficient web applications and sharing my knowledge through
          writing.
        </p>
        <p>
          On this blog, you'll find articles about web development, programming best
          practices, and my thoughts on the latest tech trends. Feel free to explore and
          don't hesitate to reach out if you have any questions or just want to chat!
        </p>
      </div>
    </div>
  );
}
