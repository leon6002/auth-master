export const AttractionSkeletonError = () => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-green-400">
      获取景点详细信息失败
      <div className="relative -mx-4 cursor-col-resize">
        <div style={{ height: 146 }}></div>
      </div>
    </div>
  );
};
