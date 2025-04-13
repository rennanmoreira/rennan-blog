
import React, { useState, useEffect } from 'react';
import BlogLayout from '@/components/BlogLayout';
import BlogPostCard from '@/components/BlogPostCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Loader2, RefreshCw } from 'lucide-react';
import { getAllPosts } from '@/services/blogService';
import { BlogPost } from '@/services/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Temporary mock categories until we add them to the database
const CATEGORIES = [
  { id: 'technology', name: 'Technology' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'travel', name: 'Travel' },
  { id: 'food', name: 'Food & Cooking' },
  { id: 'health', name: 'Health & Fitness' },
  { id: 'business', name: 'Business' },
];

const AllPostsPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [posts, searchQuery, selectedCategories, sortBy]);
  
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const applyFilters = () => {
    let result = [...posts];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter (temporary until we add categories to posts)
    if (selectedCategories.length > 0) {
      // Note: In the real implementation, we would filter by actual categories
      // This is a placeholder for demonstration
      const randomSelection = result.filter((_, index) => index % 3 === 0);
      result = selectedCategories.length === CATEGORIES.length ? result : randomSelection;
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
      } else if (sortBy === 'az') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'za') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
    
    setFilteredPosts(result);
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSortBy('newest');
  };

  return (
    <BlogLayout>
      <div className="blog-container py-8">
        <div className="mb-8">
          <h1 className="blog-title text-center mb-3">All Posts</h1>
          <p className="blog-subtitle text-center max-w-2xl mx-auto">
            Browse and discover all our articles
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="az">A-Z</SelectItem>
                  <SelectItem value="za">Z-A</SelectItem>
                </SelectContent>
              </Select>
              
              {(searchQuery || selectedCategories.length > 0 || sortBy !== 'newest') && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>
          
          {showFilters && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CATEGORIES.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category.id}`} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label 
                        htmlFor={`category-${category.id}`}
                        className="cursor-pointer"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-serif mb-4">No posts found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </BlogLayout>
  );
};

export default AllPostsPage;
