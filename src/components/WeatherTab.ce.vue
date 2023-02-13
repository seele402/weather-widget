<template>
  <div class="weather-container">
    <div class="empty-card" v-if="!citiesStore.cities.length">
      <div class="empty-header">
        <p>Weather widget</p>
        <button
          class="empty-settings-button"
          @click="$emit('settings-button-pressed')"
        ></button>
      </div>
      <div class="empty-body">
        Nothing here yet! Go to the settings to add new cities.
      </div>
    </div>
    <WeatherCard
      v-for="city in citiesStore.cities"
      :key="city.lon"
      :city="city"
      @settings-button-pressed="$emit('settings-button-pressed')"
    />
  </div>
</template>

<script setup lang="ts">
import { useCitiesStore } from "@/stores/cities";
import WeatherCard from "./WeatherCard.ce.vue";

const citiesStore = useCitiesStore();
</script>

<style scoped lang="scss">
p {
  font-weight: 500;
  margin: 0;
}
.empty-card {
  display: flex;
  flex-direction: column;
  .empty-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .empty-settings-button {
      height: 20px;
      width: 20px;
      background: no-repeat center url("https://svgshare.com/i/qF1.svg");
    }
  }
  .empty-body {
    margin-top: 16px;
    text-align: center;
    word-break: normal;
  }
}
</style>
