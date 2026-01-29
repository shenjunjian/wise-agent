import { type ProviderV3 } from "@ai-sdk/provider";
import type { ToolSet, ResponseMessage, LanguageModelUsage, UserContent, ModelMessage } from "ai";

/** 增加一个函数调用声明，防止ts报错 */
declare module "@ai-sdk/provider" {
  interface ProviderV3 {
    (modelId: string): LanguageModelV3;
  }
}

/** 子代理的配置信息  */
export interface AgentConfig {
  /** 名称，也是 model-id */
  name: string;
  /** ai@v6 下的模型提供器 */
  provider: ProviderV3;
  /** 大模型特有的选项 */
  providerOptions?: any;
  /** ai@v6 的 工具集合 */
  tools?: ToolSet;
  /** 模型的描述 */
  description?: string;
  /** 价格的描述 */
  price?: string;
}

export interface ToolAnswer {
  success: boolean;
  message: string | any[];
  totalUsage: LanguageModelUsage;
}

export type AgentRoles = "plan" | "chat" | "browser" | "voice" | "tts" | "critic";

export interface AppMessage {
  id?: string;
  role: "user" | AgentRoles;
  /** 支持  文字 | 用户多模态的输入 | AI的多模态输出 | 工具的调用及返回 */
  content: string | UserContent | ToolInputContent;
}

// 自定义tool-input的app 消息格式
export interface ToolInputContent {
  toolCallId: string;
  title?: string | undefined;
  toolName: string;
  toolInput: string;
  toolResult: string;
}
