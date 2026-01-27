import type { AgentConfig } from "../../types.d.ts";
import { createDeepSeek } from "@ai-sdk/deepseek";

export const criticAgentConfig: AgentConfig[] = [
  {
    name: "qwen-flash",
    provider: createDeepSeek({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
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
    tools: {},
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
    tools: {},
    description:
      "通义千问3系列Max模型，相较preview版本在智能体编程与工具调用方向进行了专项升级。本次发布的正式版模型达到领域SOTA水平，适配场景更加复杂的智能体需求。",
    price: `input: 3.2 元/百万\n output: 12.8 元/百万`,
  },
];

export const criticPrompt = `# 你是审计助手。

## 职责

根据获得的全部对话消息，返回用户任务或问题是否已经完成
`;
