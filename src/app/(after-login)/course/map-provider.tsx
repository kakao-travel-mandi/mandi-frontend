//Since the map will be laoded and displayed on client side
'use client';

// Import necessary modules and functions from external libraries and our own project
import { ReactNode, useCallback, useState } from 'react';

import { Libraries, useJsApiLoader } from '@react-google-maps/api';

// Define a list of libraries to load from the Google Maps API
const libraries: Libraries = ['places'];

// Define a function component called MapProvider that takes a children prop
export function MapProvider({ children }: { children: ReactNode }) {
  // Load the Google Maps JavaScript API asynchronously
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries: libraries,
  });

  if (loadError) return <p>Encountered error while loading google maps</p>;

  if (!isLoaded) return <p>Map Script is loading ...</p>;

  // Return the children prop wrapped by this MapProvider component
  return children;
}
