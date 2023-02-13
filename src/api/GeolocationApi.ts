import type { GeolocationResults } from "@/types/GeolocationResults";

export const getCityFromCoordinates = async (
  lat: number,
  lon: number
): Promise<GeolocationResults> => {
  return await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&zoom=14&format=json`
  ).then((x) => x.json());
};
