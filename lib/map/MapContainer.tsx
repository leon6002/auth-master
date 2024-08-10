// // MapContainer.tsx
// "use client";
// import ReactDOM from "react-dom";
// import React, { useEffect, useRef, Fragment } from "react";
// // import AMapLoader from "@amap/amap-jsapi-loader";
// import {
//   Map,
//   APILoader,
//   ScaleControl,
//   ToolBarControl,
//   ControlBarControl,
//   Geolocation,
// } from "@uiw/react-amap";
// interface MapContainerProps {
//   blocation: string;
//   glocation: string;
// }

// // const loadAMap = async () => {
// //   const AMap = await AMapLoader.load({
// //     key: "865606525bf1a9005bdcb71e73d52790", // 请替换为你的高德地图 Web 端开发者 Key
// //     version: "2.0",
// //     plugins: ["AMap.Scale"],
// //   });
// //   return AMap;
// // };

// //     .then((AMap) => {
// //       mapRef.current = new AMap.Map("container", {
// //         viewMode: "2D",
// //         zoom: 10,
// //         center: blocationFloat,
// //       });
// //       setMapLoaded(true);
// //     })
// //     .catch((e) => {
// //       console.error(e);
// //     });
// // }

// const MapContainer = ({ blocation, glocation }: MapContainerProps) => {
//   // const mapRef = useRef<AMap.Map | null>(null);
//   // const [AMap, setAMap] = useState(null) as AMap.Map | null;
//   // const [mapLoaded, setMapLoaded] = useState(false);
//   // const blocationFloat = blocation.split(",").map((value) => parseFloat(value));
//   // if (!AMap) {
//   //   setAMap(loadAMap());
//   // }

//   // useEffect(() => {
//   //   window._AMapSecurityConfig = {
//   //     securityJsCode: "3a55a59e8066075ace61e8952e411db2", // 请替换为你的实际安全密钥
//   //   };
//   //   if (!AMap) {
//   //     setAMap(loadAMap());
//   //   }

//   //   mapRef.current = new AMap.Map("container", {
//   //     viewMode: "2D",
//   //     zoom: 10,
//   //     center: blocationFloat,
//   //   });
//   //   setMapLoaded(true);
//   const Demo = () => (
//     <div>
//       <Map style={{ height: 300 }}>
//         <ScaleControl offset={[16, 30]} position="LB" />
//         <ToolBarControl offset={[16, 10]} position="RB" />
//         <ControlBarControl offset={[16, 180]} position="RB" />
//         <Geolocation
//           maximumAge={100000}
//           borderRadius="5px"
//           position="RB"
//           offset={[16, 80]}
//           zoomToAccuracy={true}
//           showCircle={true}
//         />
//       </Map>
//       <Map style={{ height: 300 }}>
//         {({ AMap, map, container }) => {
//           return;
//         }}
//       </Map>
//     </div>
//   );

//   //   // 清理函数：在组件卸载时销毁地图实例
//   //   return () => {
//   //     console.log(" mapRef?.destroy();");
//   //     // mapRef?.destroy();
//   //   };
//   // }, [AMap, blocationFloat]);
//   // 空数组确保 useEffect 只运行一次，模拟 componentDidMount

//   // if (!AMap) {
//   //   setAMap(loadAMap());
//   // }
//   // const marker = new AMap.Marker({
//   //   position: mapRef.current.LngLat(116.39, 39.9), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
//   //   title: "塔尔寺",
//   // });
//   // mapRef.current.add(marker);
//   return (
//     // <div
//     //   id="container"
//     //   className="w-100"
//     //   style={{ height: "800px" }}
//     //   ref={mapRef} // 将 ref 关联到 div，以便 AMap 初始化
//     // >
//     //   {/* 可以在此处添加加载指示器或其他内容，直到 mapLoaded 为 true */}
//     //   {mapLoaded && <p>地图加载完成！</p>}
//     // </div>
//     // <div className="h-[300px] w-[300px]">
//     <APILoader version="2.0.5" akey="865606525bf1a9005bdcb71e73d52790">
//       <Demo />
//     </APILoader>
//     // </div>
//   );
// };

// export default MapContainer;
