import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating?: number;
  reviewCount?: number;
  showScore?: boolean;
  size?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating = 5.0,
  reviewCount,
  showScore = true,
  size = 14
}) => {
  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      <div className="flex items-center text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            className={`${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
          />
        ))}
      </div>
      {showScore && (
        <span className="text-xs font-semibold text-[#142238] ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-[#64748B]">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
