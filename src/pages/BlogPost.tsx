import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogPosts';
import Button from '../components/UI/Button';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const foundPost = blogPosts.find(post => post.id === id);

    if (foundPost) {
      setPost(foundPost);
      document.title = `${foundPost.title} | CineScope Diaries`;

      const related = blogPosts
        .filter(p => p.category === foundPost.category && p.id !== id)
        .slice(0, 3);

      setRelatedPosts(related);
    } else {
      navigate('/blog', { replace: true });
    }
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-500 dark:text-gray-400">Loading post...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-20"
    >
      {/* Header Section */}
      <div className="w-full h-72 md:h-96 lg:h-128 relative mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="text-white max-w-3xl">
            <span className="inline-block text-gold bg-gray-900/70 px-3 py-1 text-sm font-medium rounded mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-200 text-sm space-x-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <article className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-10 mb-8">
              <div className="max-w-prose">
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  {post.description}
                </p>
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings:font-semibold prose-a:text-red-600 dark:prose-a:text-gold"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Post Tags */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center">
                  <Tag size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="mr-2 mb-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-red-600 dark:text-gold hover-underline-animation font-medium"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to all articles
              </Link>
            </div>
          </article>

          {/* Sidebar Section */}
          <aside className="lg:w-1/3">
            {/* Author Bio */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-heading font-semibold mb-4 text-gray-900 dark:text-white">
                About the Author
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.author} is a film critic and cultural analyst passionate about cinema’s role in society. Their work blends theory, storytelling, and personal insight.
              </p>
              <Button to="/about" variant="outline" size="sm">
                Meet the Team
              </Button>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-heading font-semibold mb-4 text-gray-900 dark:text-white">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link key={related.id} to={`/blog/${related.id}`} className="block group">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={related.image} 
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                        <div>
                          <h4 className="text-gray-900 dark:text-white font-medium group-hover:text-red-600 dark:group-hover:text-gold transition-colors">
                            {related.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {related.date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostPage;
