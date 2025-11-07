import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import Button from '../components/UI/Button';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundPost = blogPosts.find((p) => p.id === id);

    if (foundPost) {
      setPost(foundPost);
      document.title = `${foundPost.title} | FlickTales`;

      const related = blogPosts
        .filter((p) => p.category === foundPost.category && p.id !== id)
        .slice(0, 3);
      setRelatedPosts(related);
    } else {
      navigate('/blog', { replace: true });
    }
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gradient-to-b dark:from-gray-950 dark:to-black transition-colors">
        <div className="animate-pulse text-lg text-gray-500 dark:text-gray-400">
          Loading cinematic tale...
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-20 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* ===== Header Section ===== */}
      <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-b-3xl shadow-2xl mb-16">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 hover:scale-110"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-gray-900/60 to-transparent dark:from-black dark:via-gray-950/80 dark:to-transparent" />
        <div className="container mx-auto px-6 relative h-full flex items-end pb-12">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block mb-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide shadow-md">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3 leading-snug bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 text-sm space-x-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1 text-red-500" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-1 text-yellow-500" />
                <span>{post.author}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ===== Article Content ===== */}
          <motion.article
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3"
          >
            <div className="p-8 md:p-12 rounded-2xl backdrop-blur-lg bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-red-500/10 transition-all duration-500">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {post.description}
              </p>
              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-red-600 dark:prose-a:text-yellow-400 prose-strong:text-yellow-500 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 flex flex-wrap items-center gap-2">
                <Tag size={18} className="text-red-500 dark:text-yellow-400" />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm shadow-sm hover:bg-gradient-to-r hover:from-red-600 hover:to-yellow-500 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Link
                to="/blog"
                className="inline-flex items-center text-red-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-red-500 font-medium transition-colors"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to All Articles
              </Link>
            </div>
          </motion.article>

          {/* ===== Sidebar ===== */}
          <aside className="lg:w-1/3 space-y-8">
            {/* Author Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="p-6 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-gray-800 shadow-lg"
            >
              <h3 className="text-lg font-heading font-semibold mb-4 text-red-600 dark:text-yellow-400">
                About the Author
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                {post.author} is a film critic and cultural analyst passionate about cinema’s
                influence on storytelling and society. They merge film theory with narrative
                warmth to illuminate cinematic art.
              </p>
              <Button to="/about" variant="outline" size="sm">
                Meet the Team
              </Button>
            </motion.div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="p-6 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-gray-800 shadow-lg"
              >
                <h3 className="text-lg font-heading font-semibold mb-5 text-red-600 dark:text-yellow-400">
                  Related Articles
                </h3>
                <div className="space-y-5">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      to={`/blog/${related.id}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-yellow-400 transition-colors text-sm">
                          {related.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {related.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </aside>
        </div>
      </div>

      {/* ===== Cinematic Footer Divider ===== */}
      <div className="mt-20 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 opacity-70 w-3/4 mx-auto rounded-full blur-sm" />
    </motion.div>
  );
};

export default BlogPostPage;
