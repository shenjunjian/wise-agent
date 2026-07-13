import type { NextAgent } from "../next-agent";
import { ToolLoopAgent, Output } from "ai";

export const useCompress = (agent: NextAgent) => {
   let limit =6

  let compressAgent: ToolLoopAgent | null = null;

  async function compress() {
    if (agent.messages.value.length >= limit && compressAgent) {
      const result = await compressAgent.generate({
        messages: agent.messages.value,
      });

      agent.messages.value = [
        {
          role: "user",
          content: '[历史对话摘要]:'+result.text,
        },
      ];
    }
  }
  // **************** 生命周期  ****************

  agent.on("initAgent", () => {
    compressAgent = new ToolLoopAgent({
      model: agent.settings.model,
      instructions: `你是一个压缩助手，你下面的对话历史压缩为最简短的话。`,
      output: Output.text(),
    });
  });

  agent.on("chatEnd", async () => {
    await compress();
  });

  return { compress };
};
