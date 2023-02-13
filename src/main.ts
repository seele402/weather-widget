import { createApp, defineCustomElement } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import WeatherWidget from "./components/WeatherWidget.ce.vue";
import SettingsTab from "./components/SettingsTab.ce.vue";
import SettingsCityCard from "./components/SettingsCityCard.ce.vue";
import WeatherTab from "./components/WeatherTab.ce.vue";
import WeatherCard from "./components/WeatherCard.ce.vue";

WeatherWidget.styles = [
  ...WeatherWidget.styles,
  ...SettingsTab.styles,
  ...WeatherTab.styles,
  ...WeatherCard.styles,
  ...SettingsCityCard.styles,
];
createApp(App).use(createPinia());

const element = defineCustomElement(WeatherWidget);

customElements.define("weather-widget", element);
