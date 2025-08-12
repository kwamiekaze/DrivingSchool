interface DistanceMatrixResponse {
  rows: {
    elements: {
      distance: { text: string; value: number }
      duration: { text: string; value: number }
      status: string
    }[]
  }[]
}

interface GeocodeResponse {
  results: {
    geometry: {
      location: { lat: number; lng: number }
    }
    place_id: string
    formatted_address: string
  }[]
}

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

export async function geocodeAddress(address: string) {
  if (!GOOGLE_MAPS_API_KEY) {
    return {
      lat: 33.5816 + Math.random() * 0.1 - 0.05,
      lng: -84.4877 + Math.random() * 0.1 - 0.05,
      placeId: `mock_place_${Date.now()}`,
      formattedAddress: address,
    }
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GOOGLE_MAPS_API_KEY}`
    )
    
    const data: GeocodeResponse = await response.json()
    
    if (data.results.length === 0) {
      throw new Error('No results found for address')
    }

    const result = data.results[0]
    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      placeId: result.place_id,
      formattedAddress: result.formatted_address,
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    throw error
  }
}

export async function calculateDistanceMatrix(
  origins: string[],
  destinations: string[]
) {
  if (!GOOGLE_MAPS_API_KEY) {
    return origins.map(() =>
      destinations.map(() => ({
        distance: { text: '5.2 mi', value: 8369 },
        duration: { text: '12 mins', value: 720 + Math.random() * 600 },
        status: 'OK',
      }))
    )
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origins.join('|')
      )}&destinations=${encodeURIComponent(
        destinations.join('|')
      )}&units=imperial&key=${GOOGLE_MAPS_API_KEY}`
    )
    
    const data: DistanceMatrixResponse = await response.json()
    
    return data.rows.map(row => row.elements)
  } catch (error) {
    console.error('Distance Matrix error:', error)
    throw error
  }
}

export function optimizeRoute(lessons: Array<{
  zone: string
  startTime: string | Date
  etaMinutes?: number
}>) {
  const sortedLessons = [...lessons].sort((a, b) => {
    if (a.zone !== b.zone) {
      return a.zone.localeCompare(b.zone)
    }
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  })

  let totalTravelTime = 0
  for (let i = 0; i < sortedLessons.length - 1; i++) {
    totalTravelTime += sortedLessons[i].etaMinutes || 15
  }

  return {
    optimizedLessons: sortedLessons,
    totalTravelTime,
    savings: Math.max(0, lessons.length * 20 - totalTravelTime),
  }
}

export const atlantaZones = [
  {
    id: 'west-sw',
    name: 'West/SW',
    description: 'Carrollton, Douglasville, I-20W corridor',
    color: '#3B82F6',
    polygonGeoJson: {
      type: 'Polygon',
      coordinates: [[
        [-85.0782, 33.5816],
        [-84.7420, 33.5816],
        [-84.7420, 33.4500],
        [-85.0782, 33.4500],
        [-85.0782, 33.5816],
      ]],
    },
  },
  {
    id: 'south',
    name: 'South',
    description: 'Fairburn, Union City, College Park, Riverdale',
    color: '#8B5CF6',
    polygonGeoJson: {
      type: 'Polygon',
      coordinates: [[
        [-84.6000, 33.4500],
        [-84.3000, 33.4500],
        [-84.3000, 33.3000],
        [-84.6000, 33.3000],
        [-84.6000, 33.4500],
      ]],
    },
  },
  {
    id: 'east-se',
    name: 'East/SE',
    description: 'Stockbridge, McDonough, Conyers',
    color: '#10B981',
    polygonGeoJson: {
      type: 'Polygon',
      coordinates: [[
        [-84.3000, 33.5500],
        [-83.9000, 33.5500],
        [-83.9000, 33.3000],
        [-84.3000, 33.3000],
        [-84.3000, 33.5500],
      ]],
    },
  },
  {
    id: 'north-nw',
    name: 'North/NW',
    description: 'Marietta, Smyrna, Sandy Springs',
    color: '#F59E0B',
    polygonGeoJson: {
      type: 'Polygon',
      coordinates: [[
        [-84.7000, 33.9500],
        [-84.3000, 33.9500],
        [-84.3000, 33.7000],
        [-84.7000, 33.7000],
        [-84.7000, 33.9500],
      ]],
    },
  },
  {
    id: 'intown',
    name: 'Intown',
    description: 'Downtown/Midtown/West End',
    color: '#EC4899',
    polygonGeoJson: {
      type: 'Polygon',
      coordinates: [[
        [-84.4500, 33.8000],
        [-84.3000, 33.8000],
        [-84.3000, 33.7000],
        [-84.4500, 33.7000],
        [-84.4500, 33.8000],
      ]],
    },
  },
]
