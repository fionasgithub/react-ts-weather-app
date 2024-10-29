import dayjs from "dayjs";
import { SunData, TimeOfDay } from "@/types";

export function getMoment(sunData: SunData): TimeOfDay {
  const now = dayjs();
  const sunrise = dayjs(sunData.Rise);
  const sunset = dayjs(sunData.Set);

  return now.isAfter(sunrise) && now.isBefore(sunset) ? "day" : "night";
}
