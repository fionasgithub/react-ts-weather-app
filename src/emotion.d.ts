import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    backgroundColor: string;
    foregroundColor: string;
    boxShadow: string;
    titleColor: string;
    temperatureColor: string;
    textColor: string;
  }
}
