export const calculateParcelCost = ({
    parcelType,
    weight,
    senderRegion,
    receiverRegion,
}) => {
    const isWithinRegion =
        senderRegion === receiverRegion;

    if (!senderRegion || !receiverRegion) {
        return null;
    }

    if (parcelType === "document") {
        return isWithinRegion ? 60 : 80;
    }

    const parsedWeight = Number(weight);

    if (
        !Number.isFinite(parsedWeight) ||
        parsedWeight <= 0
    ) {
        return null;
    }

    if (parsedWeight <= 3) {
        return isWithinRegion ? 110 : 150;
    }

    const extraWeight =
        parsedWeight - 3;

    const extraWeightCharge =
        extraWeight * 40;

    if (isWithinRegion) {
        return 110 + extraWeightCharge;
    }

    return (
        150 +
        extraWeightCharge +
        40
    );
};