export function EmptyScreen() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-4">
        <h1 className="text-sm font-semibold">欢迎来到谷流仓AI</h1>
        <p className="text-xs leading-normal text-muted-foreground">
          下方选择一个AI模型，即可开始对话
        </p>
        <p className="text-xs leading-normal text-muted-foreground">
          普通助手用于回答一般性问题。
        </p>
        <p className="text-xs leading-normal text-muted-foreground">
          旅游规划助手可以帮助您搜索旅游景点，规划旅游路线等功能！
        </p>
      </div>
    </div>
  );
}
