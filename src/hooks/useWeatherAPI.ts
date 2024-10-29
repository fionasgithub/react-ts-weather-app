import { useState, useCallback } from "react";
import { WeatherElement, SunData } from "@/types";

const BASE_URL = "http://dataservice.accuweather.com";
const API_KEY = import.meta.env.VITE_APP_ACCUWEATHER_API_KEY;

const fetchCurrentWeather = (locationKey: string) => {
  return fetch(
    `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`
  )
    .then((response) => response.json())
    .then<{
      observationTime: string;
      temperature: number;
      windSpeed: number;
      weatherCode: number;
    }>((data) => {
      const weather = data[0];
      return {
        observationTime: weather.LocalObservationDateTime,
        temperature: weather.Temperature.Metric.Value,
        windSpeed: weather.Wind.Speed.Imperial.Value,
        weatherCode: Number(weather.LocalSource.WeatherCode),
      };
    });
};
const fetchWeatherForecast = (locationKey: string) => {
  return fetch(
    `${BASE_URL}/forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY}&details=true`
  )
    .then((response) => response.json())
    .then<{
      description: string;
      rainProbability: number;
      sunData: SunData;
    }>((data) => {
      const weather = data.DailyForecasts[0].Day;
      const sunData = data.DailyForecasts[0].Sun;

      return {
        description: data.Headline.Text,
        rainProbability: weather.RainProbability,
        sunData,
      };
    });
};

const useWeatherAPI = (): [
  WeatherElement,
  (locationKey: string) => Promise<void>
] => {
  const [weatherElement, setWeatherElement] = useState<WeatherElement>({
    description: "-",
    windSpeed: 0.0,
    temperature: 0.0,
    rainProbability: 0.0,
    observationTime: "",
    sunData: {
      Rise: "",
      EpochRise: 0,
      Set: "",
      EpochSet: 0,
    },
    weatherCode: 1,
    isLoading: false,
  });

  const fetchData = useCallback(async (locationKey: string) => {
    setWeatherElement((prevState) => ({ ...prevState, isLoading: true }));

    const [currentWeather, weatherForecast] = await Promise.all([
      fetchCurrentWeather(locationKey),
      fetchWeatherForecast(locationKey),
    ]);

    setWeatherElement({
      ...currentWeather,
      ...weatherForecast,
      isLoading: false,
    });
  }, []);

  return [weatherElement, fetchData];
};

export default useWeatherAPI;
