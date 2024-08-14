"use client";

import { Coordinates } from "@/lib/types";
import { DrivingRoute } from "@/types/api-map-types";
function CoornidatesToString(cords: Coordinates) {
  return `${cords.lon},${cords.lat}`;
}

export const drivingRoute = async (
  origin: Coordinates,
  destination: Coordinates,
): Promise<DrivingRoute | null | undefined> => {
  try {
    const response = await fetch("/api/map/driving", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        origin: CoornidatesToString(origin),
        destination: CoornidatesToString(destination),
      }).toString(), // 传递城市参数
    });

    if (response.ok) {
      const responseBody = await response.json();
      const data: DrivingRoute = responseBody;
      if (!data.paths) {
        throw new Error("DrivingRoute failed");
      }
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
