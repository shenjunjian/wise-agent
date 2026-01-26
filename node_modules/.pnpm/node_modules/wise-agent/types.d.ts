import { type ProviderV3 } from "@ai-sdk/provider";
import { ToolSet } from "ai";

/** 子代理的配置信息  */
export interface AgentConfig {
  /** 名称，也是 model-id */
  name: string;
  /** ai@v6 下的模型提供器 */
  aiProvider: ProviderV3;
  /** ai@v6 的 工具集合 */
  tools: ToolSet;
  /** 模型的描述 */
  description?: string;
  /** 价格的描述 */
  price?: string;
}
