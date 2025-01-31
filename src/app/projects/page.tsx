import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'TK Nuryanti',
    description: 'A website for TK Nuryanti Registration and Marketing',
    image: '/projects/tknuryanti.png?height=360&width=640',
    link: 'https://nuryantiislamicmontessori.com/',
  },
  {
    title: 'Eyewear Tryon',
    description: 'A Marketplace website with AR to try on the eyeglasses right away',
    image: '/projects/eyewear-tryon.png?height=360&width=640',
    link: 'https://tryon.tcglabs.id',
  },
  {
    title: 'TCG Labs Blog',
    description:
      'A Blog website that will update the content and public content whenever mdx is added to public files',
    image: '/projects/tcgblogs.png?height=360&width=640',
    link: 'https://tcglabs.id',
  },
  // Add more projects as needed
];

export default function ProjectsPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>My Projects</h1>
      <div className='grid gap-6 md:grid-cols-2'>
        {projects.map((project, index) => (
          <div key={index} className='border rounded-lg overflow-hidden'>
            <Image
              src={project.image}
              alt={project.title}
              width={640}
              height={360}
              className='w-full object-cover'
            />
            <div className='p-4'>
              <h2 className='text-xl font-semibold mb-2'>{project.title}</h2>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                {project.description}
              </p>
              <Link
                href={project.link}
                className='inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
                View Project
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
