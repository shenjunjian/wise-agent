import type { NextAgent } from "../next-agent";
import { ToolLoopAgent } from "ai";

export const useCompress = (agent: NextAgent) => {
   const config = {
    limitMessage: 6,
    keepMessages: 3,
   }

  let compressAgent: ToolLoopAgent | null = null;

  async function compress() {
    const messages = agent.messages.value;
    if (messages.length < config.limitMessage || !compressAgent) return;

    const splitIndex = Math.max(0, messages.length - config.keepMessages);
    const messagesToCompress = messages.slice(0, splitIndex);
    const messagesToKeep = messages.slice(splitIndex);
    if (messagesToCompress.length === 0) return;

    const result = await compressAgent.generate({
      messages: messagesToCompress,
    });

    agent.messages.value = [
      {
        role: "user",
        content: "[历史对话摘要]:" + result.text,
      },
      ...messagesToKeep,
    ];
  }

  // **************** 生命周期  ****************

  agent.on("initAgent", () => {
    compressAgent = new ToolLoopAgent({
      model: agent.settings.model,
      instructions: `你是一个压缩助手，你下面的对话历史压缩为最简短的话。`,
    });
  });

  agent.on("chatEnd", async () => {
    await compress();
  });

  return { compress,config };
};
