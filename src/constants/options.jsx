export const SelectTravelList= [
    {
        id: 1,
        title: 'Just me',
        desc: 'A sole travels in the company of others.',
        icon: 'fa fa-plane',
        people: '1',
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Traveling with a partner.',
        icon: 'fa fa-heart',
        people: '2',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Traveling with family members.',
        icon: 'fa fa-users',
        people: '4',
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Traveling with friends.',
        icon: 'fa fa-user-friends',
        people: '3',
    },
    {
        id: 5,
        title: 'Group',
        desc: 'Traveling with a large group.',
        icon: 'fa fa-users-cog',
        people: '10',
    }
];

export const SelectBudgetList = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: 'fa fa-dollar-sign',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balance between cost and comfort',
        icon: 'fa fa-money-bill-wave',
    },
    {
        id: 3,
        title: 'Expensive',
        desc: 'Enjoy luxury and comfort',
        icon: 'fa fa-gem',
    },
    {
        id: 4,
        title: 'Luxury',
        desc: 'Experience the best of the best',
        icon: 'fa fa-crown',
    }
];

export const AI_PROMPT = "Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget , Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Uri, Geo Coordinates, ticket Pricing, rating, Tme travel each of the location for {totalDays} days with each day plan with best time to visit JSON format."