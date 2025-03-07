
function InfoSection({ trip }) {
  if (!trip || !trip.userSelection) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg p-6 mb-6">
        <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex flex-wrap gap-4">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  const { location, days, budget } = trip.userSelection;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      {/* Hero section with location and gradient overlay */}
      <div className="relative h-48 bg-cover bg-center" 
           style={{ backgroundImage: `url(https://source.unsplash.com/1600x900/?${encodeURIComponent(location || 'travel')})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {location || 'Destination'}
          </h1>
          <div className="flex items-center text-white opacity-90">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-sm md:text-base">Explore the beauty of {location || 'this destination'}</span>
          </div>
        </div>
      </div>

      {/* Trip details with icons */}
      <div className="p-6 bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-around gap-4 md:gap-8">
          <div className="flex items-center">
            <div className="flex justify-center items-center w-12 h-12 bg-blue-100 rounded-full mr-4 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Duration</p>
              <h2 className="text-xl font-semibold text-gray-800">{days || 'N/A'} Days</h2>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex justify-center items-center w-12 h-12 bg-green-100 rounded-full mr-4 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Budget</p>
              <h2 className="text-xl font-semibold text-gray-800">
                {budget 
                  ? typeof budget === 'number' 
                    ? `$${budget.toLocaleString()}` 
                    : budget
                  : 'Not specified'}
              </h2>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex justify-center items-center w-12 h-12 bg-purple-100 rounded-full mr-4 text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Weather</p>
              <h2 className="text-xl font-semibold text-gray-800">Checking...</h2>
            </div>
          </div>
        </div>

        {/* Trip overview card */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Trip Overview</h3>
          <p className="text-gray-600">
            Embark on an unforgettable journey to {location || 'your destination'} for {days || 'several'} days 
            with a budget of {budget ? (typeof budget === 'number' ? `$${budget.toLocaleString()}` : budget) : 'flexible amount'}. 
            This trip offers the perfect blend of adventure, relaxation, and cultural experiences.
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Adventure</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Nature</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Local Cuisine</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Culture</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;