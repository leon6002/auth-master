"use client";

import React, { useMemo, useEffect, useRef } from "react";
import { UIState } from "@/lib/chat/actions";

interface ComponentDisplayProps {
  messages: UIState;
}

// 检查是否是BotCard组件
function isBotCard(element: React.ReactElement): boolean {
  if (!element || !element.type) return false;

  // 检查组件名称
  const componentName =
    typeof element.type === "function" ? element.type.name : "";
  return componentName === "BotCard";
}

// 递归检查元素及其子元素是否包含BotCard
function containsBotCard(element: any): boolean {
  // 如果是数组，检查数组中的每个元素
  if (Array.isArray(element)) {
    return element.some((item) => containsBotCard(item));
  }

  if (!React.isValidElement(element)) return false;

  if (isBotCard(element)) return true;

  // 检查子元素
  if (element.props && (element.props as any).children) {
    const children = React.Children.toArray((element.props as any).children);
    return children.some((child) => containsBotCard(child));
  }

  return false;
}

// 检查是否是工具消息（包括实时流式渲染和刷新后重建的情况）
function isToolMessage(display: any): boolean {
  // 情况1：刷新后重建 - tool消息被转换为数组
  if (Array.isArray(display)) {
    return true;
  }

  // 情况2：实时流式渲染 - 直接返回BotCard组件
  if (React.isValidElement(display) && isBotCard(display)) {
    return true;
  }

  // 情况3：检查是否是 Suspense 包装的组件（实时流式渲染的情况）
  if (React.isValidElement(display) && typeof display.type === "symbol") {
    // 这很可能是 React.Suspense 包装的工具组件
    return true;
  }

  // 情况4：递归检查是否包含BotCard
  return containsBotCard(display);
}

// 提取组件类型信息
function getComponentInfo(element: any): { type: string; description: string } {
  if (!React.isValidElement(element))
    return { type: "unknown", description: "未知组件" };

  // 递归查找BotCard内的实际组件
  function findInnerComponent(el: any): { type: string; description: string } {
    if (!React.isValidElement(el))
      return { type: "unknown", description: "未知组件" };

    const componentName = typeof el.type === "function" ? el.type.name : "";

    // 根据组件名称返回类型信息
    switch (componentName) {
      case "Attractions":
        return { type: "attractions", description: "景点列表" };
      case "Attraction":
        return { type: "attraction", description: "景点详情" };
      case "Weather":
        return { type: "weather", description: "天气信息" };
      case "Stocks":
        return { type: "stocks", description: "股票列表" };
      case "Stock":
        return { type: "stock", description: "股票详情" };
      case "Purchase":
        return { type: "purchase", description: "购买组件" };
      default:
        // 检查子元素
        if (el.props && (el.props as any).children) {
          const children = React.Children.toArray((el.props as any).children);
          for (const child of children) {
            const result = findInnerComponent(child);
            if (result.type !== "unknown") return result;
          }
        }
        return {
          type: componentName.toLowerCase() || "unknown",
          description: componentName || "未知组件",
        };
    }
  }

  return findInnerComponent(element);
}

export function ComponentDisplay({ messages }: ComponentDisplayProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 提取所有包含功能组件的消息
  const componentMessages = useMemo(() => {
    return messages
      .filter((message) => {
        if (!message.display) return false;
        // 使用新的工具消息检测函数
        return isToolMessage(message.display);
      })
      .map((message) => ({
        ...message,
        componentInfo: getComponentInfo(message.display),
      }));
  }, [messages]);

  // 自动滚动到最新组件
  useEffect(() => {
    if (componentMessages.length > 0 && scrollContainerRef.current) {
      // 延迟滚动，确保DOM已更新
      setTimeout(() => {
        if (scrollContainerRef.current) {
          // 添加额外的偏移量确保完全滚动到底部
          const container = scrollContainerRef.current;
          container.scrollTo({
            top: container.scrollHeight + 50, // 额外50px偏移
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [componentMessages.length]);

  // 获取组件类型图标
  const getComponentIcon = (type: string) => {
    switch (type) {
      case "attractions":
      case "attraction":
        return "🏛️";
      case "weather":
        return "🌤️";
      case "stocks":
      case "stock":
        return "📈";
      case "purchase":
        return "🛒";
      default:
        return "🔧";
    }
  };

  if (componentMessages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-4 text-4xl">🎯</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
            组件展示区域
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            当对话中调用组件时，它们将在这里显示
          </p>
          <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            支持的组件：景点信息、天气预报、股票数据等
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          对话组件
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          共 {componentMessages.length} 个组件
        </p>
      </div>

      <div
        ref={scrollContainerRef}
        className="max-h-[calc(100vh-200px)] space-y-6 overflow-y-auto pb-8"
      >
        {componentMessages.map((message, index) => (
          <div
            key={message.id}
            className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">
                  {getComponentIcon(message.componentInfo.type)}
                </span>
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {message.componentInfo.description}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    组件 #{index + 1}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                ID: {message.id.slice(0, 8)}...
              </span>
            </div>
            <div className="component-wrapper">
              <div className="[&_.group]:!ml-0 [&_.group_.flex]:!items-start [&_.group_.ml-4]:!ml-2 [&_.md\\\\:-ml-12]:!ml-0">
                {message.display}
              </div>
            </div>
          </div>
        ))}
        {/* 底部间距，确保最后一个组件能完全显示 */}
        <div className="h-4"></div>
      </div>
    </div>
  );
}
