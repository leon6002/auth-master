export interface Attraction {
  dis_list: any[];
  scenicName: string;
  glocation: string;
  salePrice: number;
  scenicId: string;
  blocation: string;
  newPicUrl: string;
  bizTime: string;
  address: string;
}

export interface showapi_res {
  showapi_res_error: string;
  showapi_res_code: number;
  showapi_res_id: string;
  showapi_res_body: any;
}

export interface CityInfo {
  c6: string;
  c5: string;
  c4: string;
  c3: string;
  c9: string;
  c8: string;
  c7: string;
  c17: string;
  c16: string;
  c1: string;
  c2: string;
  longitude: number;
  c11: string;
  c10: string;
  latitude: number;
  c12: string;
  c15: string;
}

export interface AreaCodeListData {
  prov: string;
  area: string;
  cityInfo: CityInfo;
  distric: string;
  areaid: string;
  areaCode: string;
}

export interface AreaCodeResponseData {
  ret_code: number;
  showapi_fee_code: number;
  list: AreaCodeListData[];
}

export interface AreaCodeResponseData {
  ret_code: number;
  showapi_fee_code: number;
  list: AreaCodeListData[];
}

export interface WeatherData {
  dayList: WeatherDayItem[];
  remark: string;
  areaid: string;
  ret_code: number;
  area: string;
  areaCode: string;
  cityInfo: string;
  district: string;
  prov: string;
}

export interface WeatherDayItem {
  night_weather_pic: string;
  daytime: string; // 日期字符串，例如 "20240801"
  day_wind_direction: string;
  day_weather_code: string;
  area: string;
  night_wind_power: string;
  night_weather_code: string;
  areaCode: string;
  day_weather: string;
  day_air_temperature: string; // 温度字符串，例如 "29"
  night_wind_direction: string;
  areaid: string;
  night_weather: string;
  night_air_temperature: string;
  day_weather_pic: string;
  day_wind_power: string;
}
