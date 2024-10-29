# React Typescript Weather app

This is a simple Weather App built using React and Typescript. The app was developed as part of a learning project based on the [從 Hooks 開始，讓你的網頁 React 起來](https://pjchender.dev/react-bootcamp/docs/book). Styling is not a focus in this project, so please ignore any CSS.

> **Note**:
>
> This project was created using **Vite + React + TypeScript** (React-TS) rather than the `create-react-app` setup suggested in the bootcamp materials.
>
> The original bootcamp recommends using the Taiwan Central Weather Bureau (CWB) API. However, as of October 2024, Gmail registration is not supported, and the Facebook login option is also unavailable. Therefore, this project uses AccuWeather's API instead.

## Features

- **Real-time weather updates**: Displays current weather data for a specified location.
- **Dynamic weather visuals**: Changes the app's appearance based on local sunrise and sunset times, creating a realistic day-night effect.

## Getting Started

### Prerequisites

- Node.js (>=20.10.0)

  ```bash
  nvm use
  ```

- An AccuWeather API key (register at [https://developer.accuweather.com/](https://developer.accuweather.com/))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fionasgithub/react-ts-weather-app.git
   cd react-ts-weather-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory of the project.
   - Add your AccuWeather API key as follows:

     ```plaintext
     VITE_APP_ACCUWEATHER_API_KEY=your_api_key_here
     ```

### Running the App

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

## Usage

1. Choose a location from the selector.
2. View real-time weather current conditions and forecasts for the selected location.
3. Explore the UI as it adapts dynamically based on weather data.

## Credits

- [PJCHender React Bootcamp](https://pjchender.dev/react-bootcamp/).
- Materials and assets were sourced from the original project repository: [pjchender/learn-react-from-hook-realtime-weather-app](https://github.com/pjchender/learn-react-from-hook-realtime-weather-app).
- Weather data provided by [AccuWeather](https://developer.accuweather.com/).
