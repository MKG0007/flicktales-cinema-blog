import { Star } from 'lucide-react';

type RatingProps = {
  rating: number; // Rating out of 5
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
};

const Rating = ({ rating, size = 'md', showValue = false, className = '' }: RatingProps) => {
  // Clamp rating between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, rating));
  
  // Calculate full and half stars
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Determine star size based on prop
  const starSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };
  
  const starSize = starSizes[size];

  // Determine star colors
  const fullStarColor = 'text-gold';
  const emptyStarColor = 'text-gray-300 dark:text-gray-600';

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {/* Full stars */}
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Star
              key={`full-${i}`}
              size={starSize}
              className={`${fullStarColor} fill-current`}
            />
          ))}

        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star size={starSize} className={`${emptyStarColor} fill-current`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star
                size={starSize}
                className={`${fullStarColor} fill-current`}
              />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <Star
              key={`empty-${i}`}
              size={starSize}
              className={emptyStarColor}
              fill="none"
            />
          ))}
      </div>

      {/* Show numeric value if requested */}
      {showValue && (
        <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;