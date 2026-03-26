import React from 'react';
import reviewQuote from '../../../../assets/reviewQuote.png';

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white rounded-2xl p-8 my-4 shadow-md w-full max-w-95 h-70 flex flex-col justify-between mx-auto">

            <img src={reviewQuote} alt="quote" className="w-8 mb-4 opacity-60" />

            <p className="text-gray-600 text-sm md:text-base leading-relaxed overflow-hidden">
                {review.review}
            </p>

            <div className="border-t border-dashed border-gray-300 my-6"></div>

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-700"></div>
                <div>
                    <h4 className="font-semibold text-[#002B2B]">
                        {review.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                        {review.role}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default ReviewCard;