import React, { useState, useEffect } from 'react';
import { CiLocationOn } from 'react-icons/ci';

const LocationTracker = ({ onLocationSelect }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            if (showPopup) {
                setShowPopup(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showPopup]);

    const KARAIKUDI_COORDINATES = {
        latitude: 10.0732,
        longitude: 78.7900
    };

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const isWithinKaraikudi = (latitude, longitude) => {
        const distance = getDistance(
            latitude,
            longitude,
            KARAIKUDI_COORDINATES.latitude,
            KARAIKUDI_COORDINATES.longitude
        );
        return distance <= 10; // Within 10km radius of Karaikudi
    };

    const getLocationName = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            // Get more detailed address information
            const address = data.address;

            // Try to get the most specific location first
            const locationParts = [];

            // Add road/street name if available
            if (address.road || address.street) {
                locationParts.push(address.road || address.street);
            }

            // Add area name
            if (address.suburb || address.neighbourhood) {
                locationParts.push(address.suburb || address.neighbourhood);
            }

            // Add city/town/village
            if (address.city || address.town || address.village) {
                locationParts.push(address.city || address.town || address.village);
            }

            // Add district if available
            if (address.district || address.state_district) {
                locationParts.push(address.district || address.state_district);
            }

            // If no specific parts found, use the display_name
            if (locationParts.length === 0 && data.display_name) {
                return data.display_name.split(',').slice(0, 3).join(',');
            }

            return locationParts.length > 0 ? locationParts.join(', ') : 'Location not found';
        } catch (error) {
            console.error('Error fetching location name:', error);
            return 'Location not found';
        }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });

                    // Get location name
                    const placeName = await getLocationName(latitude, longitude);
                    setLocationName(placeName);

                    if (!isWithinKaraikudi(latitude, longitude)) {
                        setShowPopup(true);
                    }

                    setLoading(false);
                },
                (error) => {
                    setError("Please enable location services to continue");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
        }
    }, []);

    const handleUseKaraikudi = () => {
        onLocationSelect("Karaikudi");
        setShowPopup(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center space-x-2">
                <CiLocationOn className="animate-pulse text-emerald-500 text-xl" />
                <span className="text-sm text-gray-600">Detecting location...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative">
                <div 
                    className="text-red-500 text-sm flex items-center space-x-2" 
                    onClick={() => setShowPopup(!showPopup)}
                >
                    <CiLocationOn className="text-xl" />
                    <span className='hidden md:block'>{error}</span>
                </div>
    
                {/* Error Popup for Mobile */}
                {showPopup && (
                    <div className="absolute top-full right-0 md:left-0 mt-2 w-48 md:w-64 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-50">
                        <div className="mb-2">
                            <span className="text-xs text-red-500">{error}</span>
                        </div>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="w-full bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-xs hover:bg-gray-200 transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <>
            <div className="relative">
                {/* Mobile View - Only Icon */}
                <div className="md:hidden">
                    <button
                        onClick={() => setShowPopup(!showPopup)}
                        className="p-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg cursor-pointer border border-gray-200 group"
                        title={locationName || (isWithinKaraikudi(currentLocation?.latitude, currentLocation?.longitude)
                            ? "Karaikudi"
                            : "Outside Karaikudi")}
                    >
                        <CiLocationOn className="text-2xl text-emerald-500 group-hover:text-emerald-600" />
                    </button>
                </div>

                {/* Desktop View - Icon with Location */}
                <div
                    onClick={() => setShowPopup(!showPopup)}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg cursor-pointer border border-gray-200 group"
                    title={locationName || (isWithinKaraikudi(currentLocation?.latitude, currentLocation?.longitude)
                        ? "Karaikudi"
                        : "Outside Karaikudi")}
                >
                    <CiLocationOn className="text-2xl text-emerald-500 group-hover:text-emerald-600" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700 max-w-[150px] truncate">
                            {locationName || (isWithinKaraikudi(currentLocation?.latitude, currentLocation?.longitude)
                                ? "Karaikudi"
                                : "Outside Karaikudi")}
                        </span>
                    </div>
                </div>

                {/* Location Popup */}
                {showPopup && (
                    <div className="absolute top-full right-0 md:left-0 mt-2 w-48 md:w-64 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-50 max-h-[200px] overflow-y-auto">
                        <div className="mb-2">
                            <span className="text-xs font-medium text-gray-700 block mb-1">Current Location:</span>
                            <span className="text-xs text-gray-600 line-clamp-2">
                                {locationName || (isWithinKaraikudi(currentLocation?.latitude, currentLocation?.longitude)
                                    ? "Karaikudi"
                                    : "Outside Karaikudi")}
                            </span>
                        </div>
                        {!isWithinKaraikudi(currentLocation?.latitude, currentLocation?.longitude) && (
                            <>
                                <p className="text-xs text-gray-600 mb-2">
                                    You seem to be outside Karaikudi. Would you like to:
                                </p>
                                <button
                                    onClick={handleUseKaraikudi}
                                    className="w-full bg-emerald-500 text-white px-3 py-1.5 rounded-md text-xs hover:bg-emerald-600 transition-colors duration-200"
                                >
                                    Use Karaikudi as location
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default LocationTracker;