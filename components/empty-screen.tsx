export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">欢迎来到谷流仓AI</h1>
        <p className="leading-normal text-muted-foreground">
          下方选择一个AI模型，即可开始对话
        </p>
        <p className="leading-normal text-muted-foreground">
          其中，普通助手用于回答一般性问题。
        </p>
        <p className="leading-normal text-muted-foreground">
          旅游规划助手可以帮助您搜索旅游景点，规划旅游路线及行程费用预估等功能，快点试试吧！
        </p>
      </div>
    </div>
  );
}
