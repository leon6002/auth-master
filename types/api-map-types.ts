export interface DrivingResponseData {
  status: string;
  info: string;
  infocode: string;
  count: string;
  route: DrivingRoute;
}

export interface DrivingRoute {
  origin: string;
  destination: string;
  paths: RoutePath[];
}

export interface RoutePath {
  distance: string;
  duration: string;
  strategy: string;
  tolls: string;
  toll_distance: string;
  steps: PathStep[];
  restriction: string;
  traffic_lights: string;
}

export interface PathStep {
  instruction: string;
  orientation: string;
  distance: string;
  tolls: string;
  toll_distance: string;
  toll_road: any[];
  duration: string;
  polyline: string;
  action: string;
  assistant_action: any[];
  road?: string; // 可选属性，因为并非所有步骤都有 road
}

export interface LocationTip {
  id: string;
  name: string;
  district: string;
  adcode: string;
  location: string;
  address: string;
  typecode: string;
  city: any[]; // 根据实际情况，可能需要更具体的类型
}

export interface LocationTipRes {
  tips: LocationTip[];
  status: string;
  info: string;
  infocode: string;
  count: string;
}
