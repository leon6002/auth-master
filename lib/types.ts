import { ChatContentType, ChatRole } from "@prisma/client";
import { CoreMessage } from "ai";

export type Message = CoreMessage & {
  id: string;
};

export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export interface Session {
  user: {
    id: string;
    email: string;
  };
}

export interface AuthResult {
  type: string;
  message: string;
}

export interface User extends Record<string, any> {
  id: string;
  email: string;
  password: string;
  salt: string;
}

export function matchChatRole(str: string): ChatRole {
  switch (str.toLowerCase()) {
    case "user":
      return ChatRole.USER;
    case "assistant":
      return ChatRole.ASSISTANT;
    case "tool":
      return ChatRole.TOOL;
    default:
      return ChatRole.USER;
  }
}

export interface ChatMessageCore {
  messageId: string;
  chatId: string;
  role: ChatRole;
  type: ChatContentType;
  content: Message["content"];
}

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
  cityInfo: CityInfo;
  currentWeather: CurrentWeather;
  f1: Forecast;
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

export interface ExtendedWeatherDayItem extends WeatherDayItem {
  dayOfWeek: string;
  formattedDate: string;
  isWeekEnd: boolean;
  isYesterday: boolean;
}

export interface WeatherNowData {
  remark: string;
  f1: Forecast;
  time: string;
  cityInfo: CityInfo;
  f2: Forecast;
  now: CurrentWeather;
  alarmList: any[]; // 或者定义更具体的报警类型
  f3: Forecast;
  ret_code: number;
}

export interface WeatherIndex {
  yh: IndexItem;
  zs: IndexItem;
  cl: IndexItem;
  travel: IndexItem;
  comfort: IndexItem;
  beauty: IndexItem;
  pj: IndexItem;
  dy: IndexItem;
  nl: IndexItem;
  pk: IndexItem;
  uv: IndexItem;
  ag: IndexItem;
  aqi: IndexItem;
  gj: IndexItem;
  mf: IndexItem;
  ls: IndexItem;
  glass: IndexItem;
  xq: IndexItem;
  ac: IndexItem;
  sports: IndexItem;
  clothes: IndexItem;
  hc: IndexItem;
  wash_car: IndexItem;
  cold: IndexItem;
}
interface IndexItem {
  desc: string;
  title: string;
}
export interface Forecast {
  day_wind_power: string;
  night_wind_power: string;
  night_weather_code: string;
  day_weather: string;
  sun_begin_end: string;
  night_weather_pic: string;
  index: WeatherIndex;
  day_weather_code: string;
  day: string;
  night_weather: string;
  ziwaixian: string;
  jiangshui: string;
  day_wind_direction: string;
  night_wind_direction: string;
  night_air_temperature: string;
  air_press: string;
  weekday: number;
  day_weather_pic: string;
  day_air_temperature: string;
}

export interface CurrentWeather {
  wind_direction: string;
  aqi: string;
  weather_pic: string;
  wind_power: string;
  temperature_time: string;
  rain: string;
  weather_code: string;
  temperature: string;
  // sd: string;
  aqiDetail: AqiDetail;
  weather: string;
  date: string;
}

export interface AqiDetail {
  quality: string;
  aqi: string;
  pm10: string;
  area: string;
  co: string;
  o3: string;
  num: string;
  no2: string;
  o3_8h: string;
  primary_pollutant: string;
  so2: string;
  pm2_5: string;
}
