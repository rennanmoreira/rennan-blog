
import React from 'react';
import BlogNavbar from './BlogNavbar';
import BlogFooter from './BlogFooter';

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <BlogNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <BlogFooter />
    </div>
  );
};

export default BlogLayout;
