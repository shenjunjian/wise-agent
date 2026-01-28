import type { AgentConfig } from "../../types.d.ts";
import { createDeepSeek } from "@ai-sdk/deepseek";

export const chatAgentConfig: AgentConfig[] = [
  {
    name: "qwen-flash",
    provider: createDeepSeek({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    description:
      "Qwen3系列Flash模型，实现思考模式和非思考模式的有效融合，可在对话中切换模式。复杂推理类任务性能优秀，指令遵循、文本理解等能力显著提高。支持1M上下文长度，按照上下文长度进行阶梯计费",
    price: `input: 0.15 元/百万\n output: 1.5 元/百万`,
  },
  {
    name: "qwen-plus",
    provider: createDeepSeek({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    description:
      "Qwen3系列Plus模型，实现思考模式和非思考模式的有效融合，可在对话中切换模式。推理能力显著超过QwQ、通用能力显著超过Qwen2.5-Plus，达到同规模业界SOTA水平",
    price: `input: 0.8 元/百万\n output: 2 元/百万`,
  },
  {
    name: "qwen3-max",
    provider: createDeepSeek({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    description:
      "通义千问3系列Max模型，相较preview版本在智能体编程与工具调用方向进行了专项升级。本次发布的正式版模型达到领域SOTA水平，适配场景更加复杂的智能体需求。",
    price: `input: 3.2 元/百万\n output: 12.8 元/百万`,
  },
  {
    name: "deepseek-v3.2",
    provider: createDeepSeek({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    description:
      "DeepSeek-V3.2是引入DeepSeek Sparse Attention（一种稀疏注意力机制）的正式版模型，也是DeepSeek推出的首个将思考融入工具使用的模型，同时支持思考模式与非思考模式的工具调用。",
    price: `input: 2 元/百万\n output: 3 元/百万`,
  },
];

export const chatPrompt = `# 你是聊天助手。

## 职责

对用户的任务或问题进行回复，返回文本或markdown内容。
`;
