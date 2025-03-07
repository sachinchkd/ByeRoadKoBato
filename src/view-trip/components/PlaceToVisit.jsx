import { ChevronDown, ChevronUp, Clock, Info, MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';

function PlaceToVisit({ trip }) {
  const [expandedPlace, setExpandedPlace] = useState(null);

  // Flatten the itinerary by combining places from all days
  const itinerary = Object.values(trip?.tripData?.itinerary || {}).flatMap(day => day.places || []);

  if (itinerary.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
          <MapPin className="w-6 h-6 text-red-500 mr-2" />
          Places To Visit
        </h2>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Places Found</h3>
          <p className="text-gray-500">We couldn't find any places to visit for this trip.</p>
        </div>
      </div>
    );
  }

  const toggleExpand = (index) => {
    setExpandedPlace(expandedPlace === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-6">
        <MapPin className="w-6 h-6 text-red-500 mr-2" />
        Places To Visit
        <span className="ml-auto bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
          {itinerary.length} Attractions
        </span>
      </h2>

      <div className="space-y-4">
        {itinerary.map((place, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden hover:border-red-200 transition-colors duration-300"
          >
            <div 
              className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-gray-50"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 mr-4">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{place.placeName}</h3>
                  {place.travelTimeFromHotel && (
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1 text-gray-500" />
                      <span>{place.travelTimeFromHotel} from hotel</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-gray-500">
                {expandedPlace === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>

            {expandedPlace === index && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                {place.placeImageUri && (
                  <div className="mb-4 rounded-lg overflow-hidden h-48">
                    <img 
                      src={place.placeImageUri} 
                      alt={place.placeName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-start mb-4">
                  <Info className="w-5 h-5 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">
                    {place.placeDetails || 'No additional details available.'}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-1">Visit Duration</h4>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-red-500" />
                      <span>{place.visitDuration || 'Flexible'}</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-1">Travel Time</h4>
                    <div className="flex items-center text-gray-600">
                      <Navigation className="w-4 h-4 mr-2 text-red-500" />
                      <span>{place.travelTimeFromHotel || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(place.placeName)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </a>
                  {place.website && (
                    <a 
                      href={place.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceToVisit;
