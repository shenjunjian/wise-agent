import { browserAgentConfig, browserPrompt } from "./config/browser-agent-config.js";
import { buildAgent } from "./config/buildAgent.js";
import { chatAgentConfig, chatPrompt } from "./config/chat-agent-config.js";
import { criticAgentConfig, criticPrompt } from "./config/critic-agent-config.js";
import { planAgentConfig, planPrompt } from "./config/plan-agent-config.js";
import { generateText, ToolLoopAgent } from "ai";
import { ttsAgentConfig, ttsPrompt } from "./config/tts-agent-config.js";
import { voiceAgentConfig, voicePrompt } from "./config/voice-agent-config.js";
import type { AgentConfig } from "../types.js";

/**
 * 多代理模型
 */
export class WiseAgent {
  /** 当前对话轮次，以用户输入任务为一轮对话。 在一轮对话中，可能会有多个子代理进行多轮的交互 */
  round = 0;

  planAgent: ToolLoopAgent;
  chatAgent: ToolLoopAgent;
  browserAgent: ToolLoopAgent;
  voiceAgent: ToolLoopAgent;
  ttsAgent: ToolLoopAgent;
  criticAgent: ToolLoopAgent;

  constructor() {
    this.planAgent = buildAgent(planAgentConfig[0]!, planPrompt);
    this.chatAgent = buildAgent(chatAgentConfig[0]!, chatPrompt);
    this.browserAgent = buildAgent(browserAgentConfig[0]!, browserPrompt);
    this.voiceAgent = buildAgent(voiceAgentConfig[0]!, voicePrompt);
    this.ttsAgent = buildAgent(ttsAgentConfig[0]!, ttsPrompt);
    this.criticAgent = buildAgent(criticAgentConfig[0]!, criticPrompt);
  }
  /** 开启一轮对话 */
  async chat(message: string) {
    this.round++;
  }

  /** 更改当前的某个代理 */
  changeAgent(name: "plan" | "chat" | "browser" | "voice" | "tts" | "critic", index: number) {
    const args = {
      plan: [planAgentConfig[index]!, planPrompt] as [AgentConfig, string],
      chat: [chatAgentConfig[index]!, chatPrompt] as [AgentConfig, string],
      browser: [browserAgentConfig[index]!, browserPrompt] as [AgentConfig, string],
      voice: [voiceAgentConfig[index]!, voicePrompt] as [AgentConfig, string],
      tts: [ttsAgentConfig[index]!, ttsPrompt] as [AgentConfig, string],
      critic: [criticAgentConfig[index]!, criticPrompt] as [AgentConfig, string],
    }[name];

    this[name + `Agent`] = buildAgent(...args);
  }
}
