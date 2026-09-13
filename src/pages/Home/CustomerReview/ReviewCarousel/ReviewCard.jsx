import reviewQuote from "../../../../assets/reviewQuote.png";

const ReviewCard = ({
    review,
    isActive,
}) => {
    return (
        <article
            className={`relative flex min-h-70 w-full max-w-sm flex-col justify-between rounded-3xl border bg-white p-7 shadow-sm transition-all duration-500 ${isActive
                    ? "border-lime-200 shadow-lg"
                    : "border-gray-100"
                }`}
        >
            <img
                src={reviewQuote}
                alt=""
                className="h-9 w-9 object-contain"
                aria-hidden="true"
            />

            <div className="mt-5 flex-1">
                <p className="text-sm leading-6 text-gray-600 md:text-base">
                    “{review.review}”
                </p>
            </div>

            <div className="mt-8">
                <div className="mb-5 w-full border-t border-dashed border-gray-200" />

                <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DCE7E8] font-bold text-[#03373D]">
                        {review.name
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>
                        <h4 className="text-base font-bold text-gray-800">
                            {review.name}
                        </h4>

                        <p className="text-xs font-medium text-gray-500">
                            {review.role}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ReviewCard;