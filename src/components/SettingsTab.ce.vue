<template>
  <div class="settings-container">
    <div class="header">
      <p>Settings</p>
      <button
        class="close-button"
        @click="$emit('close-settings-button-pressed')"
      ></button>
    </div>
    <div class="cards-list">
      <p class="is-empty-message" v-if="!citiesStore.cities.length">
        Nothing here yet! Use the form below to add new cities
      </p>
      <SettingsCityCard
        v-for="city in citiesStore.cities"
        :key="city.lon"
        :city="city"
        @start-drag="startDrag"
        @drop="onDrop(city)"
        @dragover.prevent
        @dragenter.prevent
      />
    </div>
    <p>Add Location:</p>
    <div class="input-container">
      <input
        type="text"
        placeholder="City name"
        v-model="cityQuery"
        @change="handleInput()"
        class="city-input"
      />
      <button class="enter-button"></button>
    </div>
    <p class="error-message" v-if="citiesStore.errorText">
      {{ citiesStore.errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCitiesStore } from "@/stores/cities";
import SettingsCityCard from "./SettingsCityCard.ce.vue";
import type { City } from "@/types/City";

const cityQuery = ref("");
const citiesStore = useCitiesStore();

const handleInput = () => {
  if (cityQuery.value != "") {
    citiesStore.errorText = "";
    citiesStore.addCity(cityQuery.value);
    cityQuery.value = "";
  }
};

const target = ref(0);

const startDrag = (city: City) => {
  console.log(citiesStore.cities.indexOf(city));
  target.value = citiesStore.cities.indexOf(city);
};

const onDrop = (city: City) => {
  citiesStore.cities.splice(
    citiesStore.cities.indexOf(city),
    0,
    citiesStore.cities.splice(target.value, 1)[0]
  );
  console.log(target.value, citiesStore.cities.indexOf(city));
};
</script>

<style scoped lang="scss">
@use "@/styles/colors.scss" as colors;
p {
  font-weight: 500;
  margin: 0;
}

.is-empty-message {
  font-weight: 400;
  text-align: center;
  word-break: normal;
}
.error-message {
  font-weight: 400;
  font-size: smaller;
  color: colors.$error-red;
  margin-top: 4px;
}
.cards-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  .close-button {
    height: 16px;
    width: 16px;
    font-size: larger;
    background: no-repeat center url("https://svgshare.com/i/qEz.svg");
    &:hover {
      height: 17px;
      width: 17px;
    }
  }
}

.input-container {
  display: flex;
  align-items: center;
  margin-top: 8px;
  .city-input {
    padding: 10px;
    width: 100%;
  }
  .enter-button {
    background: no-repeat center url("https://svgshare.com/i/qFV.svg");
    height: 40px;
    width: 26px;
    margin-right: 6px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
}
</style>
