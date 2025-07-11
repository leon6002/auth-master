"use client";

import React, { useMemo, useEffect, useRef, useCallback } from "react";
import { UIState } from "@/lib/chat/actions";
import {
  Layers,
  MapPin,
  Cloud,
  TrendingUp,
  ShoppingCart,
  Wrench,
} from "lucide-react";

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
  const lastMessageCountRef = useRef(0);

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

  // 滚动到底部的函数
  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  // 自动滚动到最新组件
  useEffect(() => {
    if (
      componentMessages.length > lastMessageCountRef.current &&
      scrollContainerRef.current
    ) {
      lastMessageCountRef.current = componentMessages.length;

      // 多次尝试滚动，确保内容完全加载后滚动
      const timeouts = [100, 300, 600, 1000];
      timeouts.forEach((delay) => {
        setTimeout(scrollToBottom, delay);
      });
    }
  }, [componentMessages.length, scrollToBottom]);

  // 监听容器内容变化，自动滚动
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      // 当内容发生变化时，延迟滚动到底部
      setTimeout(scrollToBottom, 100);
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => observer.disconnect();
  }, [scrollToBottom]);

  // 获取组件类型图标
  const getComponentIcon = (type: string) => {
    const iconProps = { size: 16, className: "text-blue-500" };

    switch (type) {
      case "attractions":
      case "attraction":
        return <MapPin {...iconProps} />;
      case "weather":
        return <Cloud {...iconProps} />;
      case "stocks":
      case "stock":
        return <TrendingUp {...iconProps} />;
      case "purchase":
        return <ShoppingCart {...iconProps} />;
      default:
        return <Wrench {...iconProps} />;
    }
  };

  if (componentMessages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-4 text-4xl opacity-50">🎯</div>
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
    <div className="relative h-full bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-gray-900/50 dark:via-blue-900/30 dark:to-purple-900/50">
      {/* 背景装饰元素 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-blue-200/20 blur-xl"></div>
        <div className="absolute left-8 top-40 h-24 w-24 rounded-full bg-purple-200/20 blur-lg"></div>
        <div className="absolute bottom-20 right-16 h-40 w-40 rounded-full bg-pink-200/20 blur-2xl"></div>
        <div className="absolute bottom-40 left-12 h-20 w-20 rounded-full bg-indigo-200/20 blur-lg"></div>
      </div>

      {/* 玻璃半透明头部 */}
      <div className="glass-effect dark:glass-effect-dark sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <Layers size={18} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {componentMessages.length}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {/* 显示最近的组件类型图标 */}
            {componentMessages.slice(-3).map((message) => (
              <div key={message.id} className="opacity-60">
                {getComponentIcon(message.componentInfo.type)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 滚动内容区域 */}
      <div
        ref={scrollContainerRef}
        className="h-[calc(100%-60px)] space-y-4 overflow-y-auto p-4"
      >
        {componentMessages.map((message) => (
          <div
            key={message.id}
            className="glass-effect dark:glass-effect-dark rounded-xl p-4 shadow-lg transition-all duration-200 hover:bg-white/60 hover:shadow-xl dark:hover:bg-gray-800/60"
          >
            {/* 移除头部信息，让组件内容直接展示 */}
            <div className="component-wrapper">
              {/* 移除了复杂的 CSS 选择器，因为已经简化了 BotCard 结构 */}
              <div>{message.display}</div>
            </div>
          </div>
        ))}
        {/* 底部间距，确保最后一个组件能完全显示 */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}
