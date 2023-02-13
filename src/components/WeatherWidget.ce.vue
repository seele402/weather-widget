<template>
  <div class="main-container">
    <SettingsTab
      v-if="isInSettings"
      @close-settings-button-pressed="isInSettings = false"
    />
    <WeatherTab v-else @settings-button-pressed="isInSettings = true" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SettingsTab from "./SettingsTab.ce.vue";
import WeatherTab from "./WeatherTab.ce.vue";
import { useCitiesStore } from "@/stores/cities";
const citiesStore = useCitiesStore();

const isInSettings = ref(true);

onMounted(async () => {
  await citiesStore.addUserCity();
});
</script>

<style>
button {
  appearance: none;
  outline: 0;
  border: 0;
  cursor: pointer;
}
</style>
<style scoped lang="scss">
.main-container {
  width: 250px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  padding: 24px;
  border-radius: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
}
</style>
