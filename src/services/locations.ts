import axios from 'axios';
import { Location } from '../types';
import { dummyLocations } from '../data/dummyData';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';

export const locationsService = {
  async fetchLocations(): Promise<Location[]> {
    // Try Google Places API if API key is available
    if (GOOGLE_PLACES_API_KEY) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: '40.7128,-74.0060', // Default to NYC coordinates
              radius: 5000,
              type: 'gym|stadium',
              key: GOOGLE_PLACES_API_KEY,
            },
          }
        );

        if (response.data.results) {
          return response.data.results.map((place: any, index: number) => ({
            id: place.place_id || `place-${index}`,
            name: place.name,
            address: place.vicinity,
            rating: place.rating || 0,
            latitude: place.geometry?.location?.lat,
            longitude: place.geometry?.location?.lng,
            openNow: place.opening_hours?.open_now,
            priceLevel: place.price_level,
            sportType: 'Sports Facility',
            imageUrl: place.photos?.[0]
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
              : `https://picsum.photos/seed/${place.place_id}/400/300`,
          }));
        }
      } catch (error) {
        console.error('Error fetching from Google Places API:', error);
      }
    }

    // Fallback to dummy data
    return dummyLocations;
  },
};
