import type { AgentConfig } from "../../types.d.ts";
import { createDeepSeek } from "@ai-sdk/deepseek";

export const embedAgentConfig: AgentConfig[] = [
  {
    name: "qwen3-rerank",
    provider: createDeepSeek({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
    description:
      "基于Qwen LLM底座训练的文本排序模型，对输入的Query和候选Docs进行相关性排序，支持100+语种和长文本输入，适用于文本检索、RAG等场景，效果对齐开源Qwen3-Rerank系列模型",
    price: `input: 0.5 元/百万`,
  },
  {
    name: "text-embedding-v4",
    provider: createDeepSeek({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
    description:
      "通义实验室基于Qwen3训练的多语言文本统一向量模型，相较V3版本在文本检索、聚类、分类性能大幅提升；在MTEB多语言、中英、Code检索等评测任务上效果提升15%~40%；支持64~2048维用户自定义向量维度。",
    price: `input: 0.5 元/百万`,
  },
];
