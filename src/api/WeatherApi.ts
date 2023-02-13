import type { City } from "@/types/City";
import { getWeatherFromXML } from "@/utils/XMLToObject";
import type { Weather } from "@/types/Weather";

export const getCity = async (
  cityInput: string,
  apiKey: string
): Promise<City[]> => {
  return await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`
  ).then((x) => x.json());
};

export const getWeather = async (
  cityLat: number,
  cityLon: number,
  apiKey: string
): Promise<Weather> => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=metric&mode=xml`
  )
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => getWeatherFromXML(data));
};
