import ReviewCarousel from "../ReviewCarousel/ReviewCarousel";
import ReviewHeader from "./ReviewHeader";

const Review = () => {
    return (
        <section className="py-12 md:py-16">
            <ReviewHeader />
            <ReviewCarousel />
        </section>
    );
};

export default Review;