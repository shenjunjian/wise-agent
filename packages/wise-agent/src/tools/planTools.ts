import { tool, type ToolSet } from "ai";
import z from "zod";

const callChat = tool({
  title: "chat",
  description: "这是聊天助手工具，它接收子任务的问题，返回文本或markdown 的内容",
  inputSchema: z.object({
    question: z.string().describe("子任务的问题"),
  }),
  execute: async ({ question }) => {},
});

export const planTools: ToolSet = {
  callChat,
};
