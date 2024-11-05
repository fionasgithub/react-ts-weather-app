import { useMemo } from "react";
import styled from "@emotion/styled";
import DayThunderstorm from "@/assets/images/day-thunderstorm.svg?react";
import DayClear from "@/assets/images/day-clear.svg?react";
import DayCloudyFog from "@/assets/images/day-cloudy-fog.svg?react";
import DayCloudy from "@/assets/images/day-cloudy.svg?react";
import DayFog from "@/assets/images/day-fog.svg?react";
import DayPartiallyClearWithRain from "@/assets/images/day-partially-clear-with-rain.svg?react";
import DaySnowing from "@/assets/images/day-snowing.svg?react";
import NightThunderstorm from "@/assets/images/night-thunderstorm.svg?react";
import NightClear from "@/assets/images/night-clear.svg?react";
import NightCloudyFog from "@/assets/images/night-cloudy-fog.svg?react";
import NightCloudy from "@/assets/images/night-cloudy.svg?react";
import NightFog from "@/assets/images/night-fog.svg?react";
import NightPartiallyClearWithRain from "@/assets/images/night-partially-clear-with-rain.svg?react";
import NightSnowing from "@/assets/images/night-snowing.svg?react";
import { WEATHER_TYPES, TimeOfDay, WeatherType } from "@/types";

const IconContainer = styled.div`
  flex-basis: 30%;

  svg {
    max-height: 110px;
  }
`;
const weatherTypes: Record<WeatherType, number[]> = {
  [WEATHER_TYPES.CLEAR]: [1],
  [WEATHER_TYPES.CLOUDY]: [2, 3, 4, 5, 6, 7],
  [WEATHER_TYPES.CLOUDY_FOG]: [25, 26, 27, 28],
  [WEATHER_TYPES.FOG]: [24],
  [WEATHER_TYPES.PARTIALLY_CLEAR_WITH_RAIN]: [
    8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39,
  ],
  [WEATHER_TYPES.SNOWING]: [23, 37, 42],
  [WEATHER_TYPES.THUNDERSTORM]: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
};

const weatherIcons: Record<TimeOfDay, Record<WeatherType, JSX.Element>> = {
  Day: {
    [WEATHER_TYPES.CLEAR]: <DayClear />,
    [WEATHER_TYPES.CLOUDY]: <DayCloudy />,
    [WEATHER_TYPES.CLOUDY_FOG]: <DayCloudyFog />,
    [WEATHER_TYPES.FOG]: <DayFog />,
    [WEATHER_TYPES.PARTIALLY_CLEAR_WITH_RAIN]: <DayPartiallyClearWithRain />,
    [WEATHER_TYPES.SNOWING]: <DaySnowing />,
    [WEATHER_TYPES.THUNDERSTORM]: <DayThunderstorm />,
  },
  Night: {
    [WEATHER_TYPES.CLEAR]: <NightClear />,
    [WEATHER_TYPES.CLOUDY]: <NightCloudy />,
    [WEATHER_TYPES.CLOUDY_FOG]: <NightCloudyFog />,
    [WEATHER_TYPES.FOG]: <NightFog />,
    [WEATHER_TYPES.PARTIALLY_CLEAR_WITH_RAIN]: <NightPartiallyClearWithRain />,
    [WEATHER_TYPES.SNOWING]: <NightSnowing />,
    [WEATHER_TYPES.THUNDERSTORM]: <NightThunderstorm />,
  },
};

const weatherCode2Type = (weatherCode: number): WEATHER_TYPES | undefined => {
  const [weatherType] =
    Object.entries(weatherTypes).find(([, weatherCodes]) =>
      weatherCodes.includes(Number(weatherCode))
    ) || [];

  return weatherType as WEATHER_TYPES | undefined;
};

const WeatherIcon = ({
  weatherCode,
  moment,
}: {
  weatherCode: number;
  moment: TimeOfDay;
}) => {
  const weatherType = useMemo(
    () => weatherCode2Type(weatherCode),
    [weatherCode]
  );
  const currentWeatherIcon = weatherType ? (
    weatherIcons[moment][weatherType]
  ) : (
    <DayCloudy />
  );

  return <IconContainer>{currentWeatherIcon}</IconContainer>;
};

export default WeatherIcon;
