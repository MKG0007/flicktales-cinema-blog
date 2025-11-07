import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { movieReviews } from '../data/reviews';
import Rating from '../components/UI/Rating';
import Button from '../components/UI/Button';

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [relatedReviews, setRelatedReviews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundReview = movieReviews.find((r) => r.id === id);

    if (foundReview) {
      setReview(foundReview);
      document.title = `${foundReview.movieTitle} Review | FlickTales`;

      const related = movieReviews
        .filter(
          (r) => r.id !== id && r.genre.some((g) => foundReview.genre.includes(g))
        )
        .slice(0, 3);
      setRelatedReviews(related);
    } else {
      navigate('/reviews', { replace: true });
    }
  }, [id, navigate]);

  if (!review) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gradient-to-b dark:from-gray-950 dark:to-black transition-colors">
        <div className="animate-pulse text-lg text-gray-600 dark:text-gray-400">
          Loading cinematic review...
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
      <div className="relative w-full h-[420px] md:h-[520px] mb-16 overflow-hidden rounded-b-3xl shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105 hover:scale-110"
          style={{ backgroundImage: `url(${review.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-gray-900/60 to-transparent dark:from-black dark:via-gray-950/80 dark:to-transparent" />

        <div className="container mx-auto px-6 relative h-full flex items-end pb-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="flex items-center mb-4">
              <Rating rating={review.rating} size="lg" showValue />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500">
              {review.movieTitle}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              {review.director}, {review.year}
            </p>
            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 text-sm space-x-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1 text-red-500" />
                <span>{review.date}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-1 text-yellow-500" />
                <span>{review.author}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {review.genre.map((g, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded-full text-xs text-gray-700 dark:text-gray-300"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ===== Article Section ===== */}
          <motion.article
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3"
          >
            <div className="p-8 md:p-10 rounded-3xl backdrop-blur-lg bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-red-500/10 transition-all">
              <h2 className="text-2xl font-heading font-semibold mb-4 text-red-600 dark:text-yellow-400">
                {review.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {review.synopsis}
              </p>

              {/* Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {review.images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden h-40 md:h-32 lg:h-40 group"
                  >
                    <img
                      src={image}
                      alt={`${review.movieTitle} - Scene ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>

              {/* Review Body */}
              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-red-600 dark:prose-headings:text-yellow-400 prose-a:text-red-600 dark:prose-a:text-yellow-400 prose-strong:text-yellow-500 prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: review.content }}
              />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 flex flex-wrap items-center gap-2">
                <Tag size={18} className="text-red-600 dark:text-yellow-400" />
                {review.genre.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-yellow-500 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/reviews"
                className="inline-flex items-center text-red-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-red-500 font-medium transition-colors"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to All Reviews
              </Link>
            </div>
          </motion.article>

          {/* ===== Sidebar ===== */}
          <aside className="lg:w-1/3 space-y-8">
            {/* Movie Info */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="p-6 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-gray-800 shadow-lg"
            >
              <h3 className="text-lg font-heading font-semibold mb-4 text-red-600 dark:text-yellow-400">
                Movie Details
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Director:</dt>
                  <dd className="text-gray-900 dark:text-gray-200 font-medium text-right">
                    {review.director}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Year:</dt>
                  <dd className="text-gray-900 dark:text-gray-200 font-medium text-right">
                    {review.year}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Rating:</dt>
                  <dd className="text-right">
                    <Rating rating={review.rating} size="sm" showValue />
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Genre:</dt>
                  <dd className="text-gray-900 dark:text-gray-200 font-medium text-right">
                    {review.genre.join(', ')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Reviewer:</dt>
                  <dd className="text-gray-900 dark:text-gray-200 font-medium text-right">
                    {review.author}
                  </dd>
                </div>
              </dl>
            </motion.div>

            {/* Related Reviews */}
            {relatedReviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="p-6 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-white/5 border border-gray-300 dark:border-gray-800 shadow-lg"
              >
                <h3 className="text-lg font-heading font-semibold mb-4 text-red-600 dark:text-yellow-400">
                  Related Reviews
                </h3>
                <div className="space-y-4">
                  {relatedReviews.map((related) => (
                    <Link
                      key={related.id}
                      to={`/reviews/${related.id}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={related.poster}
                          alt={related.movieTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-yellow-400 transition-colors text-sm">
                          {related.movieTitle}
                        </h4>
                        <div className="flex items-center mt-1">
                          <Rating rating={related.rating} size="sm" />
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {related.director}, {related.year}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <Button to="/reviews" variant="outline" size="sm" fullWidth>
                    View All Reviews
                  </Button>
                </div>
              </motion.div>
            )}
          </aside>
        </div>
      </div>

      {/* ===== Cinematic Divider ===== */}
      <div className="mt-20 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 opacity-70 w-3/4 mx-auto rounded-full blur-sm" />
    </motion.div>
  );
};

export default ReviewDetail;
