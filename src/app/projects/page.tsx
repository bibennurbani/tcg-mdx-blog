import Image from 'next/image';

const projects = [
  {
    title: 'Project 1',
    description: 'This is a description of Project 1.',
    image: '/placeholder.svg?height=360&width=640',
    link: '#',
  },
  {
    title: 'Project 2',
    description: 'This is a description of Project 2.',
    image: '/placeholder.svg?height=360&width=640',
    link: '#',
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
              <a
                href={project.link}
                className='inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
