import { planAgentConfig, planPrompt } from "./config/plan-agent-config.ts";
import { generateText } from "ai";

/**
 * 多代理模型
 */
export class WiseAgent {
  /** 当前对话轮次，以用户输入任务为一轮对话。 在一轮对话中，可能会有多个子代理进行多轮的交互 */
  round = 0;

  /** 开启一轮对话 */
  async chat(message: string) {
    this.round++;
    const { name, aiProvider } = planAgentConfig[0];
    const result = await generateText({
      model: aiProvider(name),
      prompt: "深圳上周发生了什么事？",
    });

    console.log("result=", result);
  }
}
