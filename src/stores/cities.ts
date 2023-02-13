import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type { City } from "@/types/City";
import { getCity, getWeather } from "@/api/WeatherApi";
import { getCityFromCoordinates } from "@/api/GeolocationApi";
import type { GeolocationResults } from "@/types/GeolocationResults";

export const useCitiesStore = defineStore("cities", () => {
  const cities = ref<City[]>([]);
  const WeatherApiKey = "20e34244d0a257a71f0c60c964f7077c";
  const errorText = ref("");
  const isFirstTime = ref(true);

  const addCity = async (cityInput: string) => {
    const newCity = (await getCity(cityInput, WeatherApiKey))[0] as City;
    if (!cityExists(newCity)) {
      cities.value.push(newCity);
      return;
    }
    errorText.value = `${newCity.name}, ${newCity.country} already exists`;
  };

  const addUserCity = async () => {
    if (isFirstTime.value) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const cityFromCoordinates = await getCityFromCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          addCity(getCityName(cityFromCoordinates));
          isFirstTime.value = false;
        },
        () => {
          return null;
        }
      );
    }
  };

  const getCityName = (city: GeolocationResults) => {
    if (city.address.village) return city.address.village;
    if (city.address.town) return city.address.town;
    if (city.address.city) return city.address.city;
    return "";
  };

  const fetchWeather = async (city: City) => {
    const cityWeather = await getWeather(city.lat, city.lon, WeatherApiKey);
    return cityWeather;
  };

  const cityExists = (newCity: City) => {
    return cities.value.some(
      (elem) => elem.lon === newCity.lon && elem.lat === newCity.lat
    );
  };

  const deleteCity = (city: City) => {
    cities.value = cities.value.filter((c) => c !== city);
  };

  if (localStorage.getItem("cities")) {
    cities.value = JSON.parse(localStorage.getItem("cities") || "{}");
  }
  if (localStorage.getItem("isFirstTime")) {
    isFirstTime.value = JSON.parse(localStorage.getItem("isFirstTime") || "{}");
  }

  watch(
    () => cities.value,
    (state) => {
      if (cities.value) localStorage.setItem("cities", JSON.stringify(state));
      if (cities.value[0] === undefined) localStorage.removeItem("cities");
    },
    { deep: true }
  );

  watch(
    () => isFirstTime.value,
    (state) => {
      localStorage.setItem("isFirstTime", JSON.stringify(state));
    },
    { deep: true }
  );

  return {
    cities,
    addCity,
    errorText,
    deleteCity,
    isFirstTime,
    addUserCity,
    fetchWeather,
  };
});
