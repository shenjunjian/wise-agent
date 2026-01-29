import { tool, type StreamTextResult, type ToolSet } from "ai";
import z from "zod";
import type { WiseAgent } from "../wise-agent.js";
import type { ToolAnswer } from "../../types.js";
import { chatPostProcess } from "../postProcess/chatPostProcess.js";

export async function stream_log(stream: StreamTextResult<{}, never>, title: string) {
  for await (const chunk of stream.fullStream) {
    console.log("       --", title + " chunk:", chunk.type, chunk);
  }

  console.log("       --", title + " stream:", stream);
  [
    "content",
    "text",
    "reasoning",
    "reasoningText",
    "files",
    "sources",
    "toolCalls",
    "toolResults",
    "finishReason",
    "rawFinishReason",
    "usage",
    "totalUsage",
    "warnings",
    "steps",
    "request",
    "response",
    "providerMetadata",
    "output",
  ].forEach(async (name) => {
    console.log(`       -- ${title} + stream.${name}=`, await stream[name]);
  });
}

const buildCallChat = (wiseAgent: WiseAgent) =>
  tool({
    title: "chat",
    description: "这是聊天助手工具，它接收子任务的问题，返回文本或markdown 的内容",
    needsApproval: false,
    inputSchema: z.object({
      question: z.string().describe("子任务的问题"),
    }),
    execute: async ({ question }) => {
      const stream = await wiseAgent.chatAgent.stream({
        prompt: question,
        abortSignal: wiseAgent.controller.signal,
      });

      // 读取 reason, 文字结果， file结果，totalToken.....
      if (wiseAgent.debug) {
        await stream_log(stream, "chat");
      }

      await chatPostProcess(wiseAgent, stream);
      return {
        success: true,
        message: await stream.text,
      } as ToolAnswer;
    },
  });

const buildCallBrowser = (wiseAgent: WiseAgent) =>
  tool({
    title: "browser",
    description:
      "这是浏览器助手工具，它接收子任务的问题，打开浏览器的指定网页，读取浏览器页面文字内容/无障碍内容/网页截图，操作浏览器页面，比如滚动，点击，填写等，向网页注入脚本并执行网页上的脚本等能力",
    needsApproval: false,
    inputSchema: z.object({
      question: z.string().describe("子任务的问题"),
    }),
    execute: async ({ question }) => {
      const stream = await wiseAgent.browserAgent.stream({
        prompt: question,
        abortSignal: wiseAgent.controller.signal,
      });

      // 读取 reason, 文字结果， file结果，totalToken.....
      await stream_log(stream, "browser");
      return {
        success: true,
        message: (await (await stream).response).messages,
      } as ToolAnswer;
    },
  });
const buildCallVoice = (wiseAgent: WiseAgent) =>
  tool({
    title: "voice",
    description: "这是语音识别助手工具，它具有识别语音，转换为相应的文字的能力。甚至能识别多种语言和多种言的能力",
    needsApproval: false,
    inputSchema: z.object({
      question: z.string().describe("子任务的问题"),
    }),
    execute: async ({ question }) => {
      const stream = await wiseAgent.voiceAgent.stream({
        prompt: question,
        abortSignal: wiseAgent.controller.signal,
      });

      // 读取 reason, 文字结果， file结果，totalToken.....
      await stream_log(stream, "voice");
      return {
        success: true,
        message: (await (await stream).response).messages,
      } as ToolAnswer;
    },
  });

const buildCallTTS = (wiseAgent: WiseAgent) =>
  tool({
    title: "tts",
    description:
      "这是语音生成助手工具，它具有通过文本合成语音的能力，甚至能生成多种语言或多种言的能力，生成带感情或拟人音色的能力",
    needsApproval: false,
    inputSchema: z.object({
      question: z.string().describe("子任务的问题"),
    }),
    execute: async ({ question }) => {
      const stream = await wiseAgent.ttsAgent.stream({
        prompt: question,
        abortSignal: wiseAgent.controller.signal,
      });

      // 读取 reason, 文字结果， file结果，totalToken.....
      await stream_log(stream, "tts");
      return {
        success: true,
        message: (await (await stream).response).messages,
      } as ToolAnswer;
    },
  });

// const buildCallCritic = (wiseAgent: WiseAgent) =>
//   tool({
//     title: "critic",
//     description: "这是审计助手工具，它根据全部会话消息，判断任务是否完成的能力",
//     needsApproval: false,
//     inputSchema: z.object({}),
//     execute: async ({}) => {
//       const stream = await wiseAgent.criticAgent.stream({
//         prompt: "判断以上对话是否完全的解决了用户的任务或问题",
//         abortSignal: wiseAgent.controller.signal,
//       });

//       // 读取 reason, 文字结果， file结果，totalToken.....
//       await stream_log(stream, "critic");
//       return {
//         success: true,
//         message: (await (await stream).response).messages,
//       } as ToolAnswer;
//     },
//   });

/** plan 的tool 构建函数 */
export const buildPlanTools = (wiseAgent: WiseAgent) => ({
  callChat: buildCallChat(wiseAgent),
  callBrowser: buildCallBrowser(wiseAgent),
  callVoice: buildCallVoice(wiseAgent),
  callTTS: buildCallTTS(wiseAgent),
  // callCritic: buildCallCritic(wiseAgent),
});
