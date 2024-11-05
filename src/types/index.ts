export enum WEATHER_TYPES {
  CLEAR = "CLEAR",
  CLOUDY = "CLOUDY",
  CLOUDY_FOG = "CLOUDY_FOG",
  FOG = "FOG",
  PARTIALLY_CLEAR_WITH_RAIN = "PARTIALLY_CLEAR_WITH_RAIN",
  SNOWING = "SNOWING",
  THUNDERSTORM = "THUNDERSTORM",
}

export type WeatherType = (typeof WEATHER_TYPES)[keyof typeof WEATHER_TYPES];

export type TimeOfDay = "Day" | "Night";

export interface SunData {
  Rise: string;
  EpochRise: number;
  Set: string;
  EpochSet: number;
}

export type WeatherElement = {
  description: string;
  windSpeed: number;
  temperature: number;
  rainProbability: number;
  observationTime: string;
  sunData: SunData;
  weatherCode: number;
  isLoading: boolean;
};

export type Pages = "WeatherCard" | "WeatherSetting";
