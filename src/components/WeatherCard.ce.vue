<template>
  <div class="weather-card">
    <div class="card-header">
      <p>{{ props.city.name }}, {{ props.city.country }}</p>
      <p v-if="!citiesStore.cities.length">Weather widget</p>
      <button
        v-if="!citiesStore.cities.indexOf(city)"
        class="settings-button"
        @click="$emit('settings-button-pressed')"
      ></button>
    </div>
    <div class="loading-message" v-if="isLoading">
      Fetching data. Please wait...
    </div>
    <div class="card-body" v-if="!isLoading">
      <div class="first-container">
        <img
          class="weather-icon"
          :src="
          'https://openweathermap.org/img/wn/' +
          cityWeather!.weather.icon +
          '@4x.png'
        "
          alt="weather icon"
        />
        <div class="temperature">
          {{ Math.round(cityWeather!.temperature.value) }}°C
        </div>
      </div>
      <div class="second-container">
        <div class="main-info">
          Feels like
          {{ Math.round(cityWeather!.feels_like.value) }}°C.
          {{ capitalizeFirstLetter(cityWeather!.weather.value) }}.
          {{ cityWeather?.wind.speed.name }}
        </div>
      </div>
      <div class="third-container">
        <div class="wind-info-container">
          <img
            class="wind-icon"
            src="https://svgshare.com/i/qFK.svg"
            alt="wind"
          />
          <div class="wind-info">
            {{ Number(cityWeather!.wind.speed.value).toFixed(1) }}m/s
            {{ cityWeather?.wind.direction.code }}
          </div>
        </div>
        <div class="pressure-info-container">
          <img
            class="pressure-icon"
            src="https://svgshare.com/i/qDR.svg"
            alt="atmospheric pressure"
          />
          <div class="pressure-info">
            {{ cityWeather?.pressure.value }}{{ cityWeather?.pressure.unit }}
          </div>
        </div>
      </div>
      <div class="fourth-container">
        <div class="humidity-info">
          Humidity: {{ cityWeather?.humidity.value
          }}{{ cityWeather?.humidity.unit }}
        </div>
        <div class="dew-point-info">
          Dew point:
          {{
            calculateDewPoint(
              cityWeather!.temperature.value,
              cityWeather!.humidity.value
            )
          }}°C
        </div>
        <div class="visibility-info">
          Visibility: {{ Number(cityWeather?.visibility.value) / 1000 }}km
        </div>
      </div>
      <div
        v-if="cardIndex != citiesStore.cities.length - 1"
        class="divider"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from "vue";
import { useCitiesStore } from "@/stores/cities";
import type { City } from "@/types/City";
import type { Weather } from "@/types/Weather";
import calculateDewPoint from "@/utils/DewPointCalculator";
import capitalizeFirstLetter from "@/utils/FirstLetterToCapital";

const isLoading = ref(true);
const cityWeather = ref<Weather>();
const citiesStore = useCitiesStore();
const windAzimuth = ref();

const props = defineProps<{
  city: City;
}>();

const cardIndex = citiesStore.cities.indexOf(props.city);

onMounted(async () => {
  async function updateWeather() {
    isLoading.value = true;
    cityWeather.value = await citiesStore.fetchWeather(props.city);
    windAzimuth.value = `${
      Number(cityWeather.value?.wind.direction.value) - 180
    }deg`;
    isLoading.value = false;
    setTimeout(updateWeather, 600000);
  }
  updateWeather();
});
</script>

<style scoped lang="scss">
@use "@/styles/colors.scss" as colors;
p {
  font-weight: 500;
  margin: 0;
}
.loading-message {
  margin-top: 16px;
  text-align: center;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .settings-button {
    height: 20px;
    width: 20px;
    background: no-repeat center url("https://svgshare.com/i/qF1.svg");
  }
}
.weather-card {
  display: flex;
  flex-direction: column;
}

.first-container {
  display: flex;
  align-items: center;
  .weather-icon {
    width: 50%;
  }
  .temperature {
    width: 50%;
    font-weight: 500;
    font-size: 30pt;
  }
}
.wind-icon,
.pressure-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.wind-icon {
  rotate: v-bind(windAzimuth);
}
.third-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  .wind-info-container {
    display: flex;
  }
  .pressure-info-container {
    display: flex;
  }
}

.fourth-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 8px;
  margin-top: 20px;
}

.divider {
  margin-top: 25px;
  margin-bottom: 25px;
  width: 100%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.137);
  align-self: center;
  border-radius: 100px;
}
</style>
