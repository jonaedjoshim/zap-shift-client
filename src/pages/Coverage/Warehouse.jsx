import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import data from "../../assets/json/warehouses.json";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const FlyToLocation = ({ location }) => {
    const map = useMap();

    useEffect(() => {
        if (location) {
            map.flyTo([location.latitude, location.longitude], 10, {
                duration: 1.5,
            });
        }
    }, [location, map]);

    return null;
};

const Warehouse = ({ selectedLocation }) => {
    return (
        <div className="w-full h-125 rounded-2xl overflow-hidden shadow-md">
            <MapContainer
                bounds={[
                    [20.0, 87.0],
                    [26.8, 93.0],
                ]}
                minZoom={6}
                maxZoom={12}
                maxBounds={[
                    [20.0, 87.0],
                    [26.8, 93.0],
                ]}
                maxBoundsViscosity={1.0}
                className="w-full h-full"
            >
                <TileLayer
                    attribution="© OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    noWrap={true}
                />

                <FlyToLocation location={selectedLocation} />

                {data.map((item, index) => (
                    <Marker
                        key={index}
                        position={[item.latitude, item.longitude]}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="text-sm">
                                <h4 className="font-bold">{item.city}</h4>
                                <p>{item.district}</p>
                                <p className="text-gray-500">
                                    {item.covered_area.join(", ")}
                                </p>
                                <p className="text-green-600 font-medium capitalize">
                                    {item.status}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Warehouse;