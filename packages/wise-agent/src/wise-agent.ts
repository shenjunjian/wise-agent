import { planAgentConfig } from "./config/plan-agent-config.ts";
import { generateText } from "ai";

/**
 * 多代理模型
 */
export class WiseAgent {
  /** 当前对话轮次，以用户输入任务为一轮对话。 在一轮对话中，可能会有多个子代理进行多轮的交互 */
  round = 0;

  async chat() {
    const { name, aiProvider } = planAgentConfig[0];
    const result = await generateText({
      model: aiProvider(name),
      prompt: "深圳上周发生了什么事？",
      // tools: {
      //   web_search: aiProvider.tools.webSearch({
      //     externalWebAccess: true,
      //     searchContextSize: "high",
      //     userLocation: {
      //       type: "approximate",
      //       city: "深圳",
      //     },
      //   }),
      // },

      // toolChoice: { type: "tool", toolName: "web_search" },
    });

    console.log("result=", result);
  }
}
