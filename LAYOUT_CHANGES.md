# 聊天页面布局调整

## 概述

对 `/agent` 页面进行了重大布局调整，将原来的单列布局改为双列布局：
- 左侧 1/3 宽度：聊天对话区域
- 右侧 2/3 宽度：组件展示区域

## 主要变更

### 1. Chat 组件 (`components/chat.tsx`)
- 将原来的单列布局改为 flex 双列布局
- 左侧包含聊天消息列表和输入面板
- 右侧展示对话中调用的功能组件

### 2. ComponentDisplay 组件 (`components/component-display.tsx`)
- 新增组件，专门用于展示对话中调用的功能组件
- 自动识别和过滤 BotCard 包装的功能组件
- 支持的组件类型：
  - 🏛️ 景点信息 (Attractions/Attraction)
  - 🌤️ 天气预报 (Weather)
  - 📈 股票数据 (Stocks/Stock)
  - 🛒 购买组件 (Purchase)
- 提供组件类型图标和描述
- 当没有组件时显示友好的空状态

### 3. ChatPanel 组件 (`components/chat-panel.tsx`)
- 移除固定定位，改为在左侧聊天区域底部显示
- 调整样式以适应窄布局
- 减少示例消息数量以适应空间限制
- 调整按钮和输入框尺寸

### 4. ChatList 组件 (`components/chat-list.tsx`)
- 移除最大宽度限制，适应窄布局
- 调整图标和文字大小
- 减少间距以优化空间利用

### 5. EmptyScreen 组件 (`components/empty-screen.tsx`)
- 调整文字大小和间距以适应窄布局
- 简化欢迎文本内容

## 功能特性

### 智能组件识别
- 自动识别对话中的功能组件
- 过滤掉纯文本消息组件
- 递归查找 BotCard 内的实际功能组件

### 响应式设计
- 保持原有的侧边栏响应式行为
- 左右布局在不同屏幕尺寸下自适应

### 用户体验优化
- 聊天对话和功能组件分离展示，提高可读性
- 组件展示区域提供更大空间展示复杂组件
- 保持聊天流程的连续性

## 使用方法

1. 访问 `/agent` 页面
2. 在左侧聊天区域进行对话
3. 当 AI 调用功能组件时（如查询景点、天气等），组件会在右侧区域展示
4. 可以同时查看聊天历史和功能组件输出

## 技术实现

### 组件过滤逻辑
```typescript
// 检查是否包含BotCard组件
function containsBotCard(element: any): boolean {
  // 递归检查元素及其子元素
}

// 提取组件类型信息
function getComponentInfo(element: any): { type: string; description: string } {
  // 识别具体的功能组件类型
}
```

### 样式调整
- 使用 Tailwind CSS 的 flex 布局
- 通过 CSS 选择器调整嵌套组件的样式
- 保持深色模式兼容性

## 兼容性

- 保持与现有功能的完全兼容
- 不影响其他页面的布局
- 保持原有的认证和路由逻辑
