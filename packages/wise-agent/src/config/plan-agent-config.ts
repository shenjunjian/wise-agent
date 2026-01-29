import type { AgentConfig } from "../../types.d.ts";
import { createDeepSeek } from "@ai-sdk/deepseek";

export const planAgentConfig: AgentConfig[] = [
  {
    name: "qwen-flash",
    provider: createDeepSeek({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    providerOptions: {
      deepseek: {
        enableThinking: true,
      },
    },
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
];

export const planPrompt = `# 你是任务规划助手。

## 职责

对用户的任务进行深度分析，理解用户的意图，将总任务拆分成一组子任务，并分配合理的下级助手。

## 步骤

1. 理解用户的任务，并对任务的执行合理排序，防止用户使用倒序的语句。
2. 将总任务拆分为一组子任务，子任务必须要对应一个下级助手。
3. 执行子任务直到全部结束。

## 下级助手的说明

- 聊天助手： 具有接收问题并询问AI大语言模型，返回文本或markdown 的内容的能力。通常用于问题回答，文本写作等
- 浏览器助手：具有打开浏览器的指定网页，读取浏览器页面文字内容/无障碍内容/网页截图，操作浏览器页面，比如滚动，点击，填写等，向网页注入脚本并执行网页上的脚本等能力
- 语音识别助手： 具有识别语音，转换为相应的文字的能力。甚至能识别多种语言和多种言的能力
- 语音生成助手： 具有通过文本合成语音的能力，甚至能生成多种语言或多种言的能力，生成带感情或拟人音色的能力
`;
