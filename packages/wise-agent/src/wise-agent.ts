import { browserAgentConfig, browserPrompt } from "./config/browser-agent-config.js";
import { buildAgent } from "./config/buildAgent.js";
import { chatAgentConfig, chatPrompt } from "./config/chat-agent-config.js";
import { criticAgentConfig, criticPrompt } from "./config/critic-agent-config.js";
import { planAgentConfig, planPrompt } from "./config/plan-agent-config.js";
import { generateText, ToolLoopAgent } from "ai";
import { ttsAgentConfig, ttsPrompt } from "./config/tts-agent-config.js";
import { voiceAgentConfig, voicePrompt } from "./config/voice-agent-config.js";
import type { AgentConfig } from "../types.js";
import { buildPlanTools } from "./tools/planTools.js";

/**
 * 多代理模型
 */
export class WiseAgent {
  /** 当前对话轮次，以用户输入任务为一轮对话。 在一轮对话中，可能会有多个子代理进行多轮的交互 */
  round = 0;

  /** 代理助手 */
  planAgent: ToolLoopAgent;
  chatAgent: ToolLoopAgent;
  browserAgent: ToolLoopAgent;
  voiceAgent: ToolLoopAgent;
  ttsAgent: ToolLoopAgent;
  criticAgent: ToolLoopAgent;

  /** 全局唯一的中断 */
  controller: AbortController;

  constructor() {
    this.planAgent = buildAgent(planAgentConfig[0]!, planPrompt, buildPlanTools(this));
    this.chatAgent = buildAgent(chatAgentConfig[0]!, chatPrompt);
    this.browserAgent = buildAgent(browserAgentConfig[0]!, browserPrompt);
    this.voiceAgent = buildAgent(voiceAgentConfig[0]!, voicePrompt);
    this.ttsAgent = buildAgent(ttsAgentConfig[0]!, ttsPrompt);
    this.criticAgent = buildAgent(criticAgentConfig[0]!, criticPrompt);

    this.controller = new AbortController();
  }
  /** 开启一轮对话 */
  async chat(message: string) {
    this.round++;

    const stream = this.planAgent.stream({
      prompt: message,
    });

    for await (const chunk of (await stream).fullStream) {
      console.log("chunk:", chunk.type, chunk);
    }

    console.log("stream: ===", stream);
  }

  /** 更改当前的某个代理的大模型配置 */
  changeAgentConfig(name: "plan" | "chat" | "browser" | "voice" | "tts" | "critic", index: number) {
    const args = {
      plan: [planAgentConfig[index]!, planPrompt] as [AgentConfig, string],
      chat: [chatAgentConfig[index]!, chatPrompt] as [AgentConfig, string],
      browser: [browserAgentConfig[index]!, browserPrompt] as [AgentConfig, string],
      voice: [voiceAgentConfig[index]!, voicePrompt] as [AgentConfig, string],
      tts: [ttsAgentConfig[index]!, ttsPrompt] as [AgentConfig, string],
      critic: [criticAgentConfig[index]!, criticPrompt] as [AgentConfig, string],
    }[name];

    // @ts-ignore
    this[name + `Agent`] = buildAgent(...args, this[name + `Agent`].tools);
  }

  /** 中断当前请求 */
  abort() {
    this.controller?.abort("用户中断");
  }
}
