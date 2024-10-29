import styled from "@emotion/styled";
import WeatherIcon from "@/components/WeatherIcon";
import AirFlowIcon from "@/assets/images/airFlow.svg?react";
import RainIcon from "@/assets/images/rain.svg?react";
import RefreshIcon from "@/assets/images/refresh.svg?react";
import LoadingIcon from "@/assets/images/loading.svg?react";
import CogIcon from "@/assets/images/cog.svg?react";
import dayjs from "dayjs";
import { WeatherElement, Pages } from "@/types";

const WeatherCardWrapper = styled.div`
  position: relative;
  width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div<{ isLoading: boolean }>`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const WeatherCard = ({
  locationName,
  weatherElement,
  fetchData,
  handleCurrentPageChange,
}: {
  locationName: string;
  weatherElement: WeatherElement;
  fetchData: () => Promise<void>;
  handleCurrentPageChange: (page: Pages) => void;
}) => {
  return (
    <WeatherCardWrapper>
      <Cog onClick={() => handleCurrentPageChange("WeatherSetting")} />
      <Location>{locationName}</Location>
      <Description>{weatherElement.description}</Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(weatherElement.temperature)} <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon weatherCode={11} moment="day" />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon /> {weatherElement.windSpeed} mi/h
      </AirFlow>
      <Rain>
        <RainIcon /> {weatherElement.rainProbability}%
      </Rain>
      <Refresh onClick={fetchData} isLoading={weatherElement.isLoading}>
        Last Observation Time:{" "}
        {weatherElement.observationTime
          ? new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
            }).format(dayjs(weatherElement.observationTime).toDate())
          : "-"}
        {weatherElement.isLoading ? <LoadingIcon /> : <RefreshIcon />}
      </Refresh>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;
