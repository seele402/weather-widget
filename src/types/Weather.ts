export type Weather = {
  city: {
    id: number;
    name: string;
    coord: { lon: number; lat: number };
    country: string;
    timezone: string;
    sun: { rise: Date; set: Date };
  };
  temperature: {
    value: number;
    min: number;
    max: number;
    unit: string;
  };
  feels_like: {
    value: number;
    unit: string;
  };
  humidity: {
    value: number;
    unit: string;
  };
  pressure: {
    value: number;
    unit: string;
  };
  wind: {
    speed: {
      value: number;
      unit: string;
      name: string;
    };
    gusts: {
      value: number;
    };
    direction: {
      value: number;
      code: string;
      name: string;
    };
  };
  clouds: {
    value: number;
    name: string;
  };
  visibility: {
    value: string;
  };
  precipitation: {
    value: number;
    mode: string;
    unit: string;
  };
  weather: {
    number: string;
    value: string;
    icon: string;
  };
  lastupdate: {
    value: string;
  };
};
