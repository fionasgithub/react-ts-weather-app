import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "@/styles";
import WeatherCard from "@/views/WeatherCard";
import WeatherSettings from "@/views/WeatherSettings";
import useWeatherAPI from "@/hooks/useWeatherAPI";
import { getMoment } from "@/utils/helpers";
import { Pages } from "@/types";
import { availableLocations } from "./utils/location-list";
import { useRegisterSW } from "virtual:pwa-register/react";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const storageLocation = localStorage.getItem("locationKey") || "315078"; // default is Taipei City (TPE)

  const [locationKey, setLocationKey] = useState(storageLocation);
  const [currentPage, setCurrentPage] = useState<Pages>("WeatherCard");
  const [currentTheme, setCurrentTheme] = useState<keyof typeof theme>("light");

  const handleCurrentLocationChange = (locationKey: string) => {
    setLocationKey(locationKey);
    fetchData(locationKey);
  };

  const handleCurrentPageChange = (currentPage: Pages) => {
    setCurrentPage(currentPage);
  };

  const [weatherElement, fetchData] = useWeatherAPI();

  const moment = useMemo(
    () => getMoment(weatherElement.sunData),
    [weatherElement.sunData]
  );

  const locationName = useMemo(() => {
    return (
      availableLocations.find(({ Key }) => Key === locationKey)
        ?.LocalizedName ?? ""
    );
  }, [locationKey]);

  useEffect(() => {
    setCurrentTheme(moment === "Day" ? "light" : "dark");
  }, [moment]);

  useEffect(() => {
    fetchData(locationKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useRegisterSW();

  return (
    <ThemeProvider theme={theme[currentTheme] as Theme}>
      <Container>
        {currentPage === "WeatherCard" && (
          <WeatherCard
            moment={moment}
            locationName={locationName}
            weatherElement={weatherElement}
            fetchData={() => fetchData(locationKey)}
            handleCurrentPageChange={handleCurrentPageChange}
          ></WeatherCard>
        )}
        {currentPage === "WeatherSetting" && (
          <WeatherSettings
            currentLocationKey={locationKey}
            handleCurrentLocationChange={handleCurrentLocationChange}
            handleCurrentPageChange={handleCurrentPageChange}
          ></WeatherSettings>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
