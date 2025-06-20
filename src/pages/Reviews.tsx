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
  const allGenres = movieReviews.flatMap(review => review.genre);
  const uniqueGenres = [...new Set(allGenres)].sort();

  // Filter reviews based on search term, genre and rating
  const filteredReviews = movieReviews.filter(review => {
    const matchesSearch = review.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
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
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-20"
    >
      {/* Header Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 mb-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
              Movie Reviews
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Thoughtful critiques and analysis of both new releases and classics
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search by title, director, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Search reviews"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Content */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/4 lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                  Filters
                </h2>
                {(selectedGenre !== '' || minRating > 0 || searchTerm !== '') && (
                  <button 
                    onClick={resetFilters}
                    className="text-red-600 dark:text-gold text-sm font-medium flex items-center"
                    aria-label="Reset all filters"
                  >
                    <FilterX size={16} className="mr-1" /> Reset
                  </button>
                )}
              </div>
              
              {/* Genre Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Genre</h3>
                <div className="space-y-2">
                  <div>
                    <button
                      onClick={() => setSelectedGenre('')}
                      className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                        selectedGenre === '' 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-gold font-medium' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      All Genres
                    </button>
                  </div>
                  {uniqueGenres.map((genre) => (
                    <div key={genre}>
                      <button
                        onClick={() => setSelectedGenre(genre)}
                        className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                          selectedGenre === genre 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-gold font-medium' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {genre}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Rating Filter */}
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Minimum Rating</h3>
                <div className="space-y-2">
                  {[0, 3, 3.5, 4, 4.5].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <button
                        onClick={() => setMinRating(rating)}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors ${
                          minRating === rating 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-gold font-medium' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span>{rating === 0 ? 'Any Rating' : `${rating}+ Stars`}</span>
                        {rating > 0 && <Rating rating={rating} size="sm" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-3/4"
          >
            {filteredReviews.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={itemVariants}
                  >
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
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No reviews found matching your search criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-red-600 dark:text-gold font-medium flex items-center mx-auto"
                >
                  <FilterX size={18} className="mr-1" /> Reset all filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Reviews;