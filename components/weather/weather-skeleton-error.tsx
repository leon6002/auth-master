export const WeatherSkeletonError = () => {
  return (
    <div className="rounded-xl border bg-gradient-to-l from-sky-200 to-sky-100 p-4">
      <div className="float-right inline-block w-fit rounded-full px-2 py-1 text-xs text-transparent">
        xxxxxxx
      </div>
      <div className="mb-1 w-fit rounded-md text-lg text-transparent">xxxx</div>
      <div className="w-fit rounded-md text-3xl font-bold text-transparent">
        xxxx
      </div>
      <div className="text mt-1 w-fit rounded-md text-sm text-muted-foreground">
        请求天气数据失败
      </div>

      <div className="relative -mx-4 cursor-col-resize">
        <div style={{ height: 146 }}></div>
      </div>
    </div>
  );
};
