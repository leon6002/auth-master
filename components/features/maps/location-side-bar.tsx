"use client";
import { estimateGasCost } from "@/lib/map-utils";
import { RouteItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface LocationSideBarProps {
  locations: RouteItem[];
  selectedLocation: RouteItem | null;
  setSelectedLocation: (location: RouteItem | null) => void;
}

interface LocationItemBoxProps {
  item: RouteItem;
  selected: RouteItem | null;
  setSelected: (location: RouteItem | null) => void;
}

const LocationSideBar = ({
  locations,
  selectedLocation,
  setSelectedLocation,
}: LocationSideBarProps) => {
  return (
    <div className="flex h-full max-h-full max-w-[500px] flex-col overflow-scroll">
      <div className="flex flex-col gap-y-1">
        {locations.map((location) => (
          <LocationItemBox
            key={location.id}
            item={location}
            selected={selectedLocation}
            setSelected={setSelectedLocation}
          />
        ))}
      </div>
    </div>
  );
};

const LocationItemBox = ({
  item,
  selected,
  setSelected,
}: LocationItemBoxProps) => {
  return (
    <button
      key={item.id}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border bg-white p-3 text-left text-sm transition-all hover:bg-accent",
        selected?.id === item.id && "bg-muted",
      )}
      onClick={() => {
        console.log("set item: ", item);
        setSelected(item);
      }}
    >
      <div className="flex w-full flex-col gap-1">
        <p>{item.id}</p>
        <p>
          预计耗时：{item.paths[0].duration} 里程：{item.paths[0].distance}km
        </p>
        <p>预估通行费：{item.paths[0].tolls}</p>
        <p>预计油费：{estimateGasCost(parseInt(item.paths[0].distance))}</p>
      </div>
    </button>
  );
};

export default LocationSideBar;
