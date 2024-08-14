"use client";
import React, { useState } from "react";
import {
  Map,
  MapTypeControl,
  ToolBarControl,
  LabelMarker,
  Polyline,
} from "@uiw/react-amap";
import { Button } from "../ui/button";
import { Coordinates, LocationPoint, RouteItem } from "@/lib/types";
import { Combobox } from "./combox";
import { DrivingRoute, LocationTip } from "@/types/api-map-types";
import { toast } from "sonner";
import { drivingRoute } from "@/lib/driving-route";
import { nanoid } from "@/lib/utils";
import {
  extractPolylines,
  findCenterOfMultiplePoints,
  calculateZoom,
} from "@/lib/map-utils";

interface MapLocateProps {
  gLngLat: Coordinates;
}
const MapSearch = ({ gLngLat }: MapLocateProps) => {
  const [show, setShow] = useState(true);
  const [center, setCenter] = useState<number[]>([gLngLat.lon, gLngLat.lat]);
  const [originMarker, setOriginMarker] = useState<number[]>([]);
  const [showOriginMarker, setShowOriginMarker] = useState<boolean>(false);
  const [showDestMarker, setShowDestMarker] = useState<boolean>(false);
  const [destinationMarker, setDestinationMarker] = useState<number[]>([]);
  const [selectedOrigin, setSelectedOrigin] = React.useState<
    LocationTip | undefined
  >();
  const [selectedDestination, setSelectedDestination] = React.useState<
    LocationTip | undefined
  >();
  const [routePlans, setRoutePlans] = useState<RouteItem[]>([]);
  const [zoom, setZoom] = useState<number>(11);
  const [polylines, setPolylines] = useState<number[][][]>();
  const handleSelectOrigin = (locationTip: LocationTip | undefined) => {
    setSelectedOrigin(locationTip);
    if (locationTip) {
      const coordinate = locationTip.location.split(",").map(parseFloat);
      setCenter(coordinate);
      setOriginMarker(coordinate);
      setShowOriginMarker(true);
    }
  };

  const handleSelectDestination = (locationTip: LocationTip | undefined) => {
    setSelectedDestination(locationTip);
    if (locationTip) {
      const coordinate = locationTip.location.split(",").map(parseFloat);
      setCenter(locationTip.location.split(",").map(parseFloat));
      setDestinationMarker(coordinate);
      setShowDestMarker(true);
    }
  };

  const startPlan = async () => {
    if (!selectedOrigin || !selectedDestination) {
      toast.error("请输入起点和终点");
      return;
    }
    const locations: LocationPoint[] = [];
    locations.push({ title: selectedOrigin.name, lnglat: originMarker });
    locations.push({
      title: selectedDestination.name,
      lnglat: destinationMarker,
    });
    await routePlan(locations);
  };
  const routePlan = async (locations: LocationPoint[]) => {
    const tmpRoutes = [];
    const tempPolylines = [];
    const tmpRoutePlans: RouteItem[] = [];

    for (let i = 0; i < locations.length - 1; i++) {
      const startCord = locations[i];
      const endCord = locations[i + 1];
      // request route api
      const route = (await drivingRoute(
        { lon: startCord.lnglat[0], lat: startCord.lnglat[1] },
        { lon: endCord.lnglat[0], lat: endCord.lnglat[1] },
      )) as DrivingRoute;
      // compose route item object
      const routeItem: RouteItem = {
        id: nanoid(),
        origin: startCord,
        destination: endCord,
        routeType: "drive",
        paths: route.paths,
      };
      //push current routeItem object into routePlans array
      tmpRoutePlans.push(routeItem);
      tmpRoutes.push(route);
      const polyline = extractPolylines(route);
      tempPolylines.push(polyline);
    }
    //set all the routePlans
    setRoutePlans(tmpRoutePlans);
    // setRoutes(tmpRoutes);
    setPolylines(tempPolylines);

    //find center position for zoom
    const centerPoi = findCenterOfMultiplePoints(
      locations.map((p) => ({ lon: p.lnglat[0], lat: p.lnglat[1] })),
    );
    const newZoom = calculateZoom(originMarker, destinationMarker, 450);
    setZoom(newZoom || 7);
    setCenter([centerPoi.lon, centerPoi.lat]);
  };

  return (
    <div className="size-full">
      <div className="flex w-full items-center justify-between gap-x-2 py-2">
        <Combobox
          selected={selectedOrigin}
          setSelected={handleSelectOrigin}
          placeholder="请输入起点"
        />
        <Combobox
          selected={selectedDestination}
          setSelected={handleSelectDestination}
          placeholder="请输入终点"
        />
      </div>
      <div className="flex items-center justify-between pb-2">
        <Button variant={"ghost"} onClick={() => setShow(!show)}>
          {show ? "隐藏图层选项" : "显示图层选项"}
        </Button>
        <Button
          variant={"outline"}
          onClick={startPlan}
          disabled={!showDestMarker || !showOriginMarker}
        >
          规划路线
        </Button>
      </div>
      <div className="h-[400px] w-full">
        <Map center={new AMap.LngLat(center[0], center[1])} zoom={zoom}>
          <LabelMarker
            visible={showDestMarker}
            name="destinationMarker"
            position={destinationMarker}
            text={{
              content: "终点",
              direction: "top",
              offset: [0, 0],
              style: {
                strokeColor: "#ffffff",
                fontSize: 14,
                fillColor: "#60666E",
                strokeWidth: 8,
                backgroundColor: "rgba(0,0,0,0)",
              },
            }}
          />
          <LabelMarker
            visible={showOriginMarker}
            name="originMarker"
            position={originMarker}
            text={{
              content: "起点",
              direction: "top",
              offset: [0, 0],
              style: {
                strokeColor: "#ffffff",
                fontSize: 14,
                fillColor: "#60666E",
                strokeWidth: 8,
                backgroundColor: "rgba(0,0,0,0)",
              },
            }}
          />
          <MapTypeControl visible={show} />
          <ToolBarControl visible={true} offset={[10, 10]} position="RB" />

          {polylines &&
            polylines.map((polyline, index) => (
              <div key={nanoid()}>
                <Polyline
                  visible={true}
                  path={polyline}
                  strokeColor="#00D3FC"
                  cursor="text"
                  showDir={true}
                  strokeWeight={7}
                  strokeOpacity={1}
                  // options={options1}
                />
              </div>
            ))}
        </Map>
      </div>
    </div>
  );
};

export default MapSearch;
