# Next.js 15 MDX Blog

This project is a personal blog built with Next.js 15, utilizing the new App Router, MDX for content management, and featuring a modern, responsive design with dark mode support.

## Features

- Built with Next.js 15 and the new App Router
- MDX support for writing blog posts
- Dynamic post list and navigation
- Nested folder support for organizing blog posts
- Tag system with counters
- Dark mode, light mode, and system-detected mode
- Responsive design
- Docker support for easy deployment
- Changelog for tracking project updates

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:

````

git clone [https://github.com/bibennurbani/tcg-mdx-blog.git](https://github.com/bibennurbani/tcg-mdx-blog.git)
cd nextjs-mdx-blog

```plaintext

2. Install dependencies:
````

npm install

```plaintext
or if you're using yarn:
```

yarn

```plaintext

3. Run the development server:
```

npm run dev

```plaintext
or
```

yarn dev

````plaintext

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Contains the main application code
- `src/components`: Reusable React components
- `src/lib`: Utility functions and helpers
- `public/posts`: MDX files for blog posts

## Writing Blog Posts

Create new `.mdx` files in the `public/posts` directory. You can organize posts in subdirectories for better structure. Each post should have frontmatter with the following fields:

```yaml
---
title: Your Post Title
date: '2023-07-20'
tags: [tag1, tag2]
summary: A brief summary of your post
draft: false
---
````

## Deployment

This project can be deployed using Docker. A `Dockerfile` and `docker-compose.yml` are provided for easy setup.

1. Build the Docker image:

```plaintext
docker build -t nextjs-mdx-blog .
```

2. Run the container:

```plaintext
docker-compose up -d
```

The blog will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
