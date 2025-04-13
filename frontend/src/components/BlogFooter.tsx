
import React from 'react';
import { Link } from 'react-router-dom';

const BlogFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-16 py-10 bg-muted/30">
      <div className="blog-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Rennan Blog</h3>
            <p className="text-muted-foreground text-sm">
              A simple blogging platform focused on clean design and excellent reading experience.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-blog-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-blog-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-blog-primary transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://twitter.com/" className="text-muted-foreground hover:text-blog-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com/" className="text-muted-foreground hover:text-blog-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-blog-primary transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} Rennan Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;
