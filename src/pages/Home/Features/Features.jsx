import features from "../../../assets/json/features.json";
import FeatureCard from "./FeatureCard";
import deliveryImg from "../../../assets/safe-delivery.png";

const Features = () => {
    return (
        <div className="my-20">
            <div className="border-y border-dashed border-[#03373D] py-14 md:py-20 space-y-6">
                {features.map((item, index) => (
                    <FeatureCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={deliveryImg}
                    />
                ))}
            </div>
        </div>
    );
};

export default Features;