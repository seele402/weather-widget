<template>
  <div
    class="city-card"
    :draggable="isDraggable ? true : false"
    @dragstart="$emit('start-drag', city)"
    @dragend="isDraggable = false"
  >
    <button
      class="drag-button"
      @mousedown="isDraggable = true"
      @touchstart="isDraggable = true"
      @mouseup="isDraggable = false"
      @touchend="isDraggable = false"
    ></button>
    <div class="name-info">{{ props.city.name }}, {{ props.city.country }}</div>
    <button
      class="delete-button"
      @click="citiesStore.deleteCity(city)"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import type { City } from "@/types/City";
import { useCitiesStore } from "@/stores/cities";
const props = defineProps<{
  city: City;
}>();
const citiesStore = useCitiesStore();
const isDraggable = ref(false);
</script>

<style scoped lang="scss">
@use "@/styles/colors.scss" as colors;
.drag-button,
.delete-button {
  height: 25px;
  width: 20px;
}
.city-card {
  display: flex;
  flex-direction: row;
  background-color: colors.$card-grey;
  padding: 6px;
  align-items: center;
  gap: 6px;
  .name-info {
    user-select: none;
  }
  .drag-button {
    cursor: grab;
    background: no-repeat center url("https://svgshare.com/i/qF0.svg");
  }
  :active {
    cursor: grabbing;
  }
  .delete-button {
    margin-left: auto;
    background: no-repeat center url("https://svgshare.com/i/qEU.svg");
    &:hover {
      background-color: colors.$card-grey;
      border-radius: 100%;
    }
  }
}
</style>
