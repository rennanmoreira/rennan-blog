
import React from 'react';
import BlogLayout from '@/components/BlogLayout';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const AboutPage = () => {
  return (
    <BlogLayout>
      <div className="blog-container py-12">
        <h1 className="blog-title mb-6">About Rennan Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="prose prose-lg max-w-none">
              <p>
                <strong>Rennan Blog</strong> is a modern blogging platform focused on providing
                an exceptional reading experience. Founded in 2025, we believe in the power of well-crafted
                content and thoughtful design.
              </p>

              <p>
                Our platform is built for developers, designers, and technology enthusiasts who want to
                share their knowledge and insights with the community. We prioritize readability, accessibility,
                and engagement in every aspect of our platform.
              </p>

              <h2>Our Mission</h2>
              <p>
                To create a space where technical content can be shared in a beautiful,
                distraction-free environment that respects both readers and writers.
              </p>

              <h2>Core Values</h2>
              <ul>
                <li><strong>Quality over quantity</strong> - We believe that well-crafted content deserves a beautiful presentation.</li>
                <li><strong>Accessibility</strong> - Content should be accessible to everyone, regardless of their abilities.</li>
                <li><strong>Community</strong> - We foster respectful discussion and knowledge sharing.</li>
                <li><strong>Simplicity</strong> - We focus on what matters most: the content.</li>
              </ul>

              <h2>Technology</h2>
              <p>
                Rennan Blog is built using modern web technologies, including React, TypeScript, and Tailwind CSS.
                The platform is designed to be fast, responsive, and accessible on all devices.
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 self-start">
            <h3 className="font-serif font-bold text-xl mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-6">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you!
            </p>
            <Button className="w-full bg-blog-primary hover:bg-blog-primary/90 text-white">
              <Mail className="mr-2 h-4 w-4" /> Contact Us
            </Button>

            <div className="mt-8">
              <h4 className="font-serif font-bold text-lg mb-2">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="text-muted-foreground hover:text-blog-primary transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-muted-foreground hover:text-blog-primary transition-colors">
                  GitHub
                </a>
                <a href="#" className="text-muted-foreground hover:text-blog-primary transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default AboutPage;
