import React from 'react';
import reviewQuote from '../../../../assets/reviewQuote.png';

const ReviewCard = ({ review, isActive }) => {
    return (
        <div className={`relative bg-gray-100 rounded-3xl p-8 shadow-xl max-w-sm w-full flex flex-col justify-between min-h-70 transition-all duration-500 border ${isActive ? 'border-lime-200' : 'border-transparent'}`}>
            <div className='my-2'>
                <img src={reviewQuote} alt="quote" className="size-10" />
            </div>

            <div className="flex-1">
                <p className={`text-gray-700 text-base md:text-lg leading-relaxed italic ${isActive ? 'font-medium' : 'font-normal'}`}>
                    "{review.review}"
                </p>
            </div>

            <div className="mt-8">
                <div className="border-t border-dashed border-gray-200 w-full mb-6"></div>
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                        {review.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-bg-gray-800 text-base md:text-lg">
                            {review.name}
                        </h4>
                        <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wider font-semibold">
                            {review.role}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;