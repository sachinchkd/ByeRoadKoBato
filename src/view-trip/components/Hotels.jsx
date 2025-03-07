import { DollarSign, ExternalLink, Hotel, MapPin, Star } from 'lucide-react';

function Hotels({ trip }) {
  // Check if hotels exists and is an array
  const hotels = Array.isArray(trip?.tripData?.hotelOptions) ? trip.tripData.hotelOptions : [];
  
  if (hotels.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Hotel className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">Hotel Recommendations</h2>
        </div>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Hotel className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Hotels Found</h3>
          <p className="text-gray-500">We couldn't find any hotel recommendations for this trip.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Hotel className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">Hotel Recommendations</h2>
        </div>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {hotels.length} Options
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Hotel Image Section */}
            <div className="h-48 bg-blue-50 relative overflow-hidden">
              {hotel.image ? (
                <img 
                  src={hotel.image} 
                  alt={hotel.hotelName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Hotel className="w-16 h-16 text-blue-200" />
                </div>
              )}
              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                <div className="flex items-center text-green-600 font-semibold">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {hotel.price || 'Contact'}
                </div>
              </div>
            </div>

            {/* Hotel Details Section */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{hotel.hotelName}</h3>
              
              {/* Rating */}
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(hotel.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {hotel.rating ? `${hotel.rating}/5` : 'Not rated'}
                </span>
              </div>
              
              {/* Address */}
              <div className="flex items-start mb-4">
                <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                <p className="text-gray-600 text-sm">
                  {hotel.hotelAddress || 'Address not available'}
                </p>
              </div>
              
              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.isArray(hotel.amenities) && hotel.amenities.length > 0 ? (
                  hotel.amenities.map((amenity, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {amenity}
                    </span>
                  ))
                ) : (
                  ['WiFi', 'Parking', 'Pool', 'Breakfast'].map((amenity, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {amenity}
                    </span>
                  ))
                )}
              </div>
              
              {/* View Button */}
              <a 
                href={hotel.website || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300"
              >
                <span>View Details</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Hotels Button (for when there are many hotels) */}
      {hotels.length > 6 && (
        <div className="mt-6 text-center">
          <button className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            View All {hotels.length} Hotels
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Hotels;