import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, FilterX } from 'lucide-react';
import Card from '../components/UI/Card';
import Rating from '../components/UI/Rating';
import { movieReviews } from '../data/reviews';

const Reviews = () => {
  useEffect(() => {
    document.title = 'Movie Reviews | FlickTales';
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [minRating, setMinRating] = useState(0);

  // Extract unique genres
  const allGenres = movieReviews.flatMap((review) => review.genre);
  const uniqueGenres = [...new Set(allGenres)].sort();

  // Filter reviews
  const filteredReviews = movieReviews.filter((review) => {
    const matchesSearch =
      review.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.synopsis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || review.genre.includes(selectedGenre);
    const matchesRating = review.rating >= minRating;
    return matchesSearch && matchesGenre && matchesRating;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setMinRating(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      className="pt-24 pb-20 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300"
    >
      {/* ===== Header Section ===== */}
      <section className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500 drop-shadow-md mb-4">
            Movie Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
            Honest insights, emotional perspectives, and cinematic storytelling — all through the lens of FlickTales.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto group">
            <input
              type="text"
              placeholder="Search by title, director, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pl-12 rounded-xl bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              aria-label="Search reviews"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 group-focus-within:text-red-500 transition-all"
              size={20}
            />
          </div>
        </motion.div>
      </section>

      {/* ===== Content Section ===== */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ===== Filters Sidebar ===== */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/4 lg:sticky lg:top-28 h-fit"
          >
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-red-500/10 transition-all">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-red-600 dark:text-yellow-400">Filters</h2>
                {(selectedGenre || minRating > 0 || searchTerm) && (
                  <button
                    onClick={resetFilters}
                    className="text-red-500 dark:text-yellow-400 text-sm font-medium flex items-center hover:text-yellow-500 dark:hover:text-red-400 transition-all"
                  >
                    <FilterX size={16} className="mr-1" /> Reset
                  </button>
                )}
              </div>

              {/* Genre Filter */}
              <div className="mb-6">
                <h3 className="text-base font-medium mb-2 text-gray-700 dark:text-gray-300">Genre</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedGenre('')}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${
                      selectedGenre === ''
                        ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    All Genres
                  </button>
                  {uniqueGenres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${
                        selectedGenre === genre
                          ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="text-base font-medium mb-2 text-gray-700 dark:text-gray-300">Minimum Rating</h3>
                <div className="space-y-2">
                  {[0, 3, 3.5, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-sm transition-all ${
                        minRating === rating
                          ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      <span>{rating === 0 ? 'Any Rating' : `${rating}+ Stars`}</span>
                      {rating > 0 && <Rating rating={rating} size="sm" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* ===== Reviews Grid ===== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-3/4"
          >
            {filteredReviews.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredReviews.map((review) => (
                  <motion.div key={review.id} variants={itemVariants}>
                    <Card
                      image={review.poster}
                      title={review.movieTitle}
                      description={review.synopsis}
                      link={`/reviews/${review.id}`}
                      date={`${review.director}, ${review.year}`}
                      category={review.genre[0]}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                  No reviews found matching your search criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="text-red-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-red-500 font-medium flex items-center mx-auto transition-all"
                >
                  <FilterX size={18} className="mr-1" /> Reset all filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== Cinematic Bottom Divider ===== */}
      <div className="mt-20 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 opacity-70 w-3/4 mx-auto rounded-full blur-sm" />
    </motion.div>
  );
};

export default Reviews;
