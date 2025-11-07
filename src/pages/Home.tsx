import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button';
import { blogPosts } from '../data/blogPosts';
import { movieReviews } from '../data/reviews';
import SplitText from '../animation/SplitText';

const Home = () => {
  useEffect(() => {
    document.title = 'FlickTales | Home';
  }, []);

  const featuredBlogPosts = blogPosts.slice(0, 3);
  const featuredReviews = movieReviews.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ===== Hero Section ===== */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/bg.png)',
            backgroundPosition: 'center 40%',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-900/90 to-transparent dark:from-black/95 dark:via-gray-950/80 dark:to-transparent" />
        </div>

        <div className="container relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl text-white"
          >
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              <SplitText text="FlickTales" />
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              <SplitText
                text="A cinematic journey through thoughtful reviews, deep analysis, and passionate film conversations."
                className="text-gray-200 leading-relaxed"
                delay={40}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,20px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              />
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/blog" size="lg">
                Read Our Blog
              </Button>
              <Button to="/reviews" variant="outline" size="lg">
                Latest Reviews
              </Button>
            </div>
          </motion.div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-950 dark:from-black to-transparent" />
      </section>

      {/* ===== Featured Articles ===== */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container px-6">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 dark:text-white mb-3"
            >
              <SplitText text="Featured Articles" />
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              <SplitText text="Dive into our thoughtful analysis and perspectives on cinema" />
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredBlogPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-red-500/10 transition-all duration-300"
              >
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm font-medium text-red-600 dark:text-yellow-400 uppercase tracking-wide">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-heading font-semibold mt-2 mb-2 text-gray-900 dark:text-white">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.date}</span>
                      <span className="inline-flex items-center text-red-600 dark:text-yellow-400 font-medium">
                        Read more <ChevronRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button to="/blog" variant="ghost">
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Latest Reviews ===== */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="container px-6">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 dark:text-white mb-3"
            >
              <SplitText text="Latest Reviews" />
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              <SplitText text="Our takes on the most recent and notable films" />
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredReviews.map((review) => (
              <motion.article
                key={review.id}
                variants={itemVariants}
                className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
              >
                <Link to={`/reviews/${review.id}`} className="block">
                  <div className="h-72 overflow-hidden">
                    <img
                      src={review.poster}
                      alt={review.movieTitle}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(review.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-1 text-gray-900 dark:text-white">
                      {review.movieTitle}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                      {review.director}, {review.year}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {review.synopsis}
                    </p>
                    <span className="inline-flex items-center text-red-600 dark:text-yellow-400 font-medium text-sm">
                      Read Review <ChevronRight size={16} className="ml-1" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button to="/reviews" variant="ghost">
              View All Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
              <SplitText text="Join Our Community" />
            </h2>
            <p className="text-gray-400 mb-8">
              <SplitText text="Subscribe to our newsletter and be part of the conversation about cinema, art, and culture." />
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-md bg-white/10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white flex-grow max-w-md"
                aria-label="Email address"
              />
              <Button type="submit" variant="primary" size="lg">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
