import features from "../../../assets/json/features.json";

import deliveryImg from "../../../assets/safe-delivery.png";
import warehouseImg from "../../../assets/warehouse.png";
import deliveryManImg from "../../../assets/tiny-deliveryman.png";

import FeatureCard from "./FeatureCard";

const featureImages = [
    deliveryImg,
    warehouseImg,
    deliveryManImg,
];

const Features = () => {
    return (
        <section className="my-16 border-y border-dashed border-[#03373D]/30 py-12 md:my-20 md:py-16">
            <div className="space-y-6">
                {features.map(
                    (item, index) => (
                        <FeatureCard
                            key={
                                item.id ??
                                item.title
                            }
                            title={
                                item.title
                            }
                            description={
                                item.description
                            }
                            image={
                                featureImages[
                                index %
                                featureImages.length
                                ]
                            }
                        />
                    )
                )}
            </div>
        </section>
    );
};

export default Features;