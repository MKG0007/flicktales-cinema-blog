import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/UI/Card';
import { blogPosts } from '../data/blogPosts';
import { Search } from 'lucide-react';

const Blog = () => {
  useEffect(() => {
    document.title = 'Blog | FlickTales';
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Unique categories
  const categories = [...new Set(blogPosts.map((post) => post.category))];

  // Filtered posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === '' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-20 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* ===== Header Section ===== */}
      <section className="relative py-20 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.08),transparent)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.15),transparent)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500">
              FlickTales Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10">
              Thoughtful analysis, perspectives, and cinematic storytelling
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto group">
              <input
                type="text"
                placeholder="Search cinematic articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 group-focus-within:text-red-500 transition-all"
                size={20}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Blog Section ===== */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/4 lg:sticky lg:top-28 h-fit"
          >
            <div className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-red-500/10 transition-all duration-300">
              <h2 className="text-2xl font-heading font-semibold mb-5 text-red-600 dark:text-yellow-400">
                Categories
              </h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === ''
                        ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>

          {/* Blog Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-3/4"
          >
            {filteredPosts.length > 0 ? (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <Card
                      image={post.image}
                      title={post.title}
                      description={post.description}
                      link={`/blog/${post.id}`}
                      date={post.date}
                      category={post.category}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 dark:text-gray-400 text-lg"
                >
                  No articles found matching your search criteria.
                </motion.p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== Bottom Divider ===== */}
      <div className="mt-20 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 opacity-70 w-3/4 mx-auto rounded-full blur-sm" />
    </motion.div>
  );
};

export default Blog;
