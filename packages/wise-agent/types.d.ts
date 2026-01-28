import { type ProviderV3 } from "@ai-sdk/provider";
import type { ToolSet, ResponseMessage, LanguageModelUsage } from "ai";

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
