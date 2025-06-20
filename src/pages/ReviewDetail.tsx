import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { movieReviews, MovieReview } from '../data/reviews';
import Rating from '../components/UI/Rating';
import Button from '../components/UI/Button';

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [review, setReview] = useState<MovieReview | null>(null);
  const [relatedReviews, setRelatedReviews] = useState<MovieReview[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const foundReview = movieReviews.find(review => review.id === id);
    
    if (foundReview) {
      setReview(foundReview);
      document.title = `${foundReview.movieTitle} Review | FlickTales`;
      
      // Find related reviews (same genre, excluding current review)
      const related = movieReviews
        .filter(r => r.id !== id && r.genre.some(g => foundReview.genre.includes(g)))
        .slice(0, 3);
      
      setRelatedReviews(related);
    } else {
      navigate('/reviews', { replace: true });
    }
  }, [id, navigate]);

  if (!review) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
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
      {/* Header */}
      <div className="w-full h-72 md:h-96 lg:h-128 relative mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${review.poster})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="text-white max-w-3xl">
            <div className="flex items-center mb-4">
              <Rating rating={review.rating} size="lg" showValue />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2">
              {review.movieTitle}
            </h1>
            <p className="text-xl text-gray-200 mb-3">
              {review.director}, {review.year}
            </p>
            <div className="flex flex-wrap items-center text-gray-200 text-sm space-x-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{review.date}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{review.author}</span>
              </div>
              <div className="flex items-center gap-1">
                {review.genre.map((genre, index) => (
                  <span 
                    key={index}
                    className="bg-gray-800/50 text-gray-200 text-xs px-2 py-0.5 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Article */}
          <article className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-10 mb-8">
              <div className="max-w-prose">
                <div className="mb-8">
                  <h2 className="text-2xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">
                    {review.title}
                  </h2>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {review.synopsis}
                  </p>
                </div>
                
                {/* Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {review.images.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden h-40 md:h-32 lg:h-40">
                      <img 
                        src={image} 
                        alt={`${review.movieTitle} - Scene ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  ))}
                </div>
                
                {/* Review Content */}
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings:font-semibold prose-a:text-red-600 dark:prose-a:text-gold"
                  dangerouslySetInnerHTML={{ __html: review.content }}
                />
              </div>
              
              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center">
                  <Tag size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                  {review.genre.map((genre, index) => (
                    <span 
                      key={index}
                      className="mr-2 mb-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <Link 
                to="/reviews" 
                className="inline-flex items-center text-red-600 dark:text-gold hover-underline-animation font-medium"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to all reviews
              </Link>
            </div>
          </article>
          
          {/* Sidebar */}
          <aside className="lg:w-1/3">
            {/* Movie Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-heading font-semibold mb-4 text-gray-900 dark:text-white">
                Movie Details
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Director:</dt>
                  <dd className="text-gray-900 dark:text-white font-medium text-right">{review.director}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Year:</dt>
                  <dd className="text-gray-900 dark:text-white font-medium text-right">{review.year}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Rating:</dt>
                  <dd className="text-right">
                    <Rating rating={review.rating} size="sm" showValue />
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Genre:</dt>
                  <dd className="text-gray-900 dark:text-white font-medium text-right">
                    {review.genre.join(', ')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Reviewer:</dt>
                  <dd className="text-gray-900 dark:text-white font-medium text-right">{review.author}</dd>
                </div>
              </dl>
            </div>
            
            {/* Related Reviews */}
            {relatedReviews.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-heading font-semibold mb-4 text-gray-900 dark:text-white">
                  Related Reviews
                </h3>
                <div className="space-y-4">
                  {relatedReviews.map((related) => (
                    <Link key={related.id} to={`/reviews/${related.id}`} className="block group">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={related.poster} 
                            alt={related.movieTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                        <div>
                          <h4 className="text-gray-900 dark:text-white font-medium group-hover:text-red-600 dark:group-hover:text-gold transition-colors">
                            {related.movieTitle}
                          </h4>
                          <div className="flex items-center mt-1">
                            <Rating rating={related.rating} size="sm" />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {related.director}, {related.year}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <Button to="/reviews" variant="outline" size="sm" fullWidth>
                    View All Reviews
                  </Button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewDetail;