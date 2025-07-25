"use client";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const ServiceMap = ({ service }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapImageLoaded, setMapImageLoaded] = useState(false);
  const [mapImageError, setMapImageError] = useState(false);
  const [currentMapService, setCurrentMapService] = useState(0);

  useEffect(() => {
    if (!service?.location) {
      setLat(28.6139); // New Delhi default
      setLng(77.2090);
      setLoading(false);
      return;
    }

    const fetchCoords = async () => {
      try {
        const cityCoordinates = {
          "mumbai": { lat: 19.0760, lng: 72.8777 },
          "delhi": { lat: 28.6139, lng: 77.2090 },
          "bangalore": { lat: 12.9716, lng: 77.5946 },
          "chennai": { lat: 13.0827, lng: 80.2707 },
          "kolkata": { lat: 22.5726, lng: 88.3639 },
          "hyderabad": { lat: 17.3850, lng: 78.4867 },
          "pune": { lat: 18.5204, lng: 73.8567 },
          "ahmedabad": { lat: 23.0225, lng: 72.5714 },
          "jaipur": { lat: 26.9124, lng: 75.7873 },
          "lucknow": { lat: 26.8467, lng: 80.9462 }
        };

        const cityName = service.location.city?.toLowerCase();

        if (cityName && cityCoordinates[cityName]) {
          const coords = cityCoordinates[cityName];
          setLat(coords.lat);
          setLng(coords.lng);
          setLoading(false);
          return;
        }

        const fullAddress = [
          service.location.street,
          service.location.city,
          service.location.state,
          service.location.zipcode
        ].filter(Boolean).join(', ');

        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`;

        const response = await fetch(nominatimUrl);
        const data = await response.json();

        if (data && data.length > 0) {
          const latitude = parseFloat(data[0].lat);
          const longitude = parseFloat(data[0].lon);
          setLat(latitude);
          setLng(longitude);
          setLoading(false);
          return;
        }

        setLat(28.6139); // Fallback to Delhi
        setLng(77.2090);
        setLoading(false);
      } catch (error) {
        setLat(28.6139); // Fallback to Delhi
        setLng(77.2090);
        setLoading(false);
      }
    };

    fetchCoords();
  }, [service]);

  const getMapUrls = () => {
    if (!lat || !lng) return [];
    const baseParams = `center=${lat},${lng}&zoom=16&size=640x400&scale=2&format=png&maptype=roadmap`;
    return [
      `https://maps.googleapis.com/maps/api/staticmap?${baseParams}&markers=color:blue%7C${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=16&size=640x400&maptype=mapnik&markers=${lat},${lng},lightblue`,
    ];
  };

  const mapUrls = getMapUrls();

  const handleImageLoad = () => {
    setMapImageLoaded(true);
    setMapImageError(false);
  };

  const handleImageError = () => {
    if (currentMapService < mapUrls.length - 1) {
      setCurrentMapService(currentMapService + 1);
      setMapImageLoaded(false);
      setMapImageError(false);
    } else {
      setMapImageError(true);
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Spinner />
        <p className="ml-2 text-sm text-gray-500">Finding service location in India...</p>
      </div>
    );
  }

  const currentMapUrl = mapUrls[currentMapService];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="relative h-64">
        {currentMapUrl && (
          <img
            key={currentMapService}
            src={currentMapUrl}
            alt="Plumber Service Location"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              mapImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {mapImageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-red-500 text-sm">Map failed to load</p>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">Plumber Service Address</h3>
        <p className="text-sm text-gray-500">
          {service.location.street && <>{service.location.street}<br /></>}
          {service.location.city}, {service.location.state} {service.location.zipcode}
        </p>
      </div>
    </div>
  );
};

export default ServiceMap;
