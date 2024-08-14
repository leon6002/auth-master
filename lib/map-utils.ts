import { DrivingRoute } from "@/types/api-map-types";
import { Coordinates } from "./types";

// WGS-84坐标系：全球通用的坐标系
// 高德采用GCJ-02（火星坐标系，百度采用BD-09坐标系， 都是WGS-84坐标系进行加密偏移后的结果
//
export const GPS = {
  PI: 3.14159265358979324,
  x_pi: (3.14159265358979324 * 3000.0) / 180.0,
  delta: function (lat: number, lon: number) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    let dLat = this.transformLat(lon - 105.0, lat - 35.0);
    let dLon = this.transformLon(lon - 105.0, lat - 35.0);
    let radLat = (lat / 180.0) * this.PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * this.PI);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * this.PI);
    return { lat: dLat, lon: dLon };
  },

  //WGS-84 to GCJ-02
  WGS_84toGCJ_02: function (wgsLat: number, wgsLon: number): number[] {
    if (this.outOfChina(wgsLat, wgsLon)) return [wgsLat, wgsLon];

    let d = this.delta(wgsLat, wgsLon);
    return [wgsLon + d.lon, wgsLat + d.lat];
  },
  //GCJ-02 to WGS-84
  GCJ_02toWGS_84: function (gcjLat: number, gcjLon: number) {
    if (this.outOfChina(gcjLat, gcjLon)) return [gcjLon, gcjLat];

    let d = this.delta(gcjLat, gcjLon);
    return [gcjLon - d.lon, gcjLat - d.lat];
  },
  //GCJ-02 to WGS-84 exactly
  GCJ_02toWGS_84Exactly: function (gcjLat: number, gcjLon: number) {
    let initDelta = 0.01;
    let threshold = 0.000000001;
    let dLat = initDelta,
      dLon = initDelta;
    let mLat = gcjLat - dLat,
      mLon = gcjLon - dLon;
    let pLat = gcjLat + dLat,
      pLon = gcjLon + dLon;
    let wgsLat,
      wgsLon,
      i = 0;
    while (1) {
      wgsLat = (mLat + pLat) / 2;
      wgsLon = (mLon + pLon) / 2;
      let tmp = this.GCJ_02toWGS_84(wgsLat, wgsLon);
      dLat = tmp[0] - gcjLat;
      dLon = tmp[1] - gcjLon;
      if (Math.abs(dLat) < threshold && Math.abs(dLon) < threshold) break;

      if (dLat > 0) pLat = wgsLat;
      else mLat = wgsLat;
      if (dLon > 0) pLon = wgsLon;
      else mLon = wgsLon;

      if (++i > 10000) break;
    }
    //console.log(i);
    return { lat: wgsLat, lon: wgsLon };
  },
  //GCJ-02 to BD-09
  GCJ_02toBD_09: function (gcjLat: number, gcjLon: number): Coordinates {
    let x = gcjLon,
      y = gcjLat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
    let bdLon = z * Math.cos(theta) + 0.0065;
    let bdLat = z * Math.sin(theta) + 0.006;
    return { lat: bdLat, lon: bdLon };
  },
  //BD-09 to GCJ-02
  BD_09toGCJ_02: function (bdLat: number, bdLon: number): Coordinates {
    let x = bdLon - 0.0065,
      y = bdLat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
    let gcjLon = z * Math.cos(theta);
    let gcjLat = z * Math.sin(theta);
    return { lat: gcjLat, lon: gcjLon };
  },
  //WGS-84 to Web mercator
  //mercatorLat -> y mercatorLon -> x
  WGS_84toWebMercator: function (wgsLat: number, wgsLon: number): Coordinates {
    let x = (wgsLon * 20037508.34) / 180;
    let y =
      Math.log(Math.tan(((90 + wgsLat) * this.PI) / 360)) / (this.PI / 180);
    y = (y * 20037508.34) / 180;
    return { lat: y, lon: x };
    /* 
            if ((Math.abs(wgsLon) > 180 || Math.abs(wgsLat) > 90)) 
                return null; 
            let x = 6378137.0 * wgsLon * 0.017453292519943295; 
            let a = wgsLat * 0.017453292519943295; 
            let y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a))); 
            return {'lat' : y, 'lon' : x}; 
            //*/
  },
  // Web mercator to WGS-84
  // mercatorLat -> y mercatorLon -> x
  WebMercatorToWGS_84: function (
    mercatorLat: number,
    mercatorLon: number,
  ): Coordinates {
    let x = (mercatorLon / 20037508.34) * 180;
    let y = (mercatorLat / 20037508.34) * 180;
    y =
      (180 / this.PI) *
      (2 * Math.atan(Math.exp((y * this.PI) / 180)) - this.PI / 2);
    return { lat: y, lon: x };
    /* 
            if (Math.abs(mercatorLon) < 180 && Math.abs(mercatorLat) < 90) 
                return null; 
            if ((Math.abs(mercatorLon) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892)) 
                return null; 
            let a = mercatorLon / 6378137.0 * 57.295779513082323; 
            let x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0); 
            let y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323; 
            return {'lat' : y, 'lon' : x}; 
            //*/
  },
  // two point's distance
  distance: function (
    originLngLat: number[],
    destinationLngLat: number[],
  ): number {
    const lonA = originLngLat[0];
    const latA = originLngLat[1];
    const lonB = destinationLngLat[0];
    const latB = destinationLngLat[1];

    let earthR = 6371000;
    let x =
      Math.cos((latA * this.PI) / 180) *
      Math.cos((latB * this.PI) / 180) *
      Math.cos(((lonA - lonB) * this.PI) / 180);
    let y = Math.sin((latA * this.PI) / 180) * Math.sin((latB * this.PI) / 180);
    let s = x + y;
    if (s > 1) s = 1;
    if (s < -1) s = -1;
    let alpha = Math.acos(s);
    let distance = alpha * earthR;
    return distance;
  },
  outOfChina: function (lat: number, lon: number): boolean {
    if (lon < 72.004 || lon > 137.8347) return true;
    if (lat < 0.8293 || lat > 55.8271) return true;
    return false;
  },
  transformLat: function (x: number, y: number): number {
    let ret =
      -100.0 +
      2.0 * x +
      3.0 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * this.PI) +
        20.0 * Math.sin(2.0 * x * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin((y / 3.0) * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((160.0 * Math.sin((y / 12.0) * this.PI) +
        320 * Math.sin((y * this.PI) / 30.0)) *
        2.0) /
      3.0;
    return ret;
  },
  transformLon: function (x: number, y: number): number {
    let ret =
      300.0 +
      x +
      2.0 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * this.PI) +
        20.0 * Math.sin(2.0 * x * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin((x / 3.0) * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((150.0 * Math.sin((x / 12.0) * this.PI) +
        300.0 * Math.sin((x / 30.0) * this.PI)) *
        2.0) /
      3.0;
    return ret;
  },
};

export const findCenterOfMultiplePoints = (coordinates: Coordinates[]) => {
  let lngMax = -180;
  let lngMin = 180;
  let latMax = -90;
  let latMin = 90;

  for (const coord of coordinates) {
    lngMax = Math.max(lngMax, coord.lon);
    lngMin = Math.min(lngMin, coord.lon);
    latMax = Math.max(latMax, coord.lat);
    latMin = Math.min(latMin, coord.lat);
  }

  return { lon: (lngMax + lngMin) / 2, lat: (latMax + latMin) / 2 };
};

export const findCenter = (startCord: Coordinates, endCord: Coordinates) => {
  let lngMax = -180;
  let lngMin = 180;
  let latMax = -90;
  let latMin = 90;

  lngMax = Math.max(lngMax, startCord.lon);
  lngMin = Math.min(lngMin, endCord.lon);
  latMax = Math.max(latMax, startCord.lat);
  latMin = Math.min(latMin, endCord.lat);

  return { lon: (lngMax + lngMin) / 2, lat: (latMax + latMin) / 2 };
};

export const extractPolylines = (data: DrivingRoute) => {
  const allPolylines = data.paths.flatMap((path) =>
    path.steps.map((step) => step.polyline),
  );

  // 转换为坐标数组
  const coordinates = allPolylines.flatMap((polyline) =>
    polyline
      .split(";")
      .filter((item) => item)
      .map((item) => item.split(",").map((coord) => parseFloat(coord))),
  );
  return coordinates;
};

export const estimateGasCost = (distance: number) => {
  return (distance * 0.7) / 1000;
};

export const calculateZoom = (
  originMarker: number[],
  destinationMarker: number[],
  mapWidth: number,
) => {
  const distance = GPS.distance(originMarker, destinationMarker);

  // 找到合适的缩放级别，从最大级别19开始递减
  for (let zoom = 16; zoom >= 3; zoom--) {
    const scalePerPixel = 0.2531 * Math.pow(2, 19 - zoom);

    // 计算marker之间的像素距离
    const pixelDistance = distance / scalePerPixel;

    // 如果像素距离小于地图宽度，说明找到了合适的缩放级别
    if (pixelDistance < mapWidth) {
      return zoom;
    }
  }
};
