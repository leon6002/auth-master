import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AgentSelectorProps {
  model: string;
  agent: string;
  handleModelChange: (value: string) => void;
  handleAgentChange: (value: string) => void;
}

const AgentSelector = ({
  model,
  agent,
  handleModelChange,
  handleAgentChange,
}: AgentSelectorProps) => {
  const onAgentChange = (value: string) => {
    if (value !== "general" && (!model || model === "llama3.1:8b")) {
      handleModelChange("gpt-4o-mini");
    }
    handleAgentChange(value);
  };
  return (
    <div className="flex gap-x-2">
      <Select
        onValueChange={onAgentChange}
        value={agent}
        defaultValue={"general"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="普通助手" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>助手类型</SelectLabel>
            <SelectItem value="general">普通助手</SelectItem>
            <SelectItem value="travel">旅游规划助手</SelectItem>
            <SelectItem value="stock">股票助手</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={handleModelChange}
        value={model}
        defaultValue={"llama3.1:8b"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="llama3.1:8b" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>模型</SelectLabel>
            <SelectItem value="llama3.1:8b" disabled={agent !== "general"}>
              llama3.1:8b
            </SelectItem>
            <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
            <SelectItem value="gpt-4o">gpt-4o</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AgentSelector;
