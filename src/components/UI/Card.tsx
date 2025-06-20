import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type CardProps = {
  image: string;
  title: string;
  description: string;
  link: string;
  date?: string;
  category?: string;
  className?: string;
};

const Card = ({
  image,
  title,
  description,
  link,
  date,
  category,
  className = '',
}: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow ${className}`}
    >
      <Link to={link} className="block">
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {category && (
            <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
              {category}
            </span>
          )}
        </div>
        <div className="p-6">
          {date && (
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{date}</p>
          )}
          <h3 className="font-heading text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {description}
          </p>
          <span className="inline-block text-red-600 dark:text-gold font-medium text-sm hover:underline">
            Read More
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;