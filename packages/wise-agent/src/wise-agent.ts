import { ToolLoopAgent, type UIMessage, type ModelMessage, type UserContent } from "ai";
import { browserAgentConfig, browserPrompt } from "./config/browser-agent-config.js";
import { chatAgentConfig, chatPrompt } from "./config/chat-agent-config.js";
import { criticAgentConfig, criticPrompt } from "./config/critic-agent-config.js";
import { planAgentConfig, planPrompt } from "./config/plan-agent-config.js";
import { ttsAgentConfig, ttsPrompt } from "./config/tts-agent-config.js";
import { voiceAgentConfig, voicePrompt } from "./config/voice-agent-config.js";
import { buildAgent } from "./config/buildAgent.js";
import { buildPlanTools, stream_log } from "./tools/planTools.js";
import type { AgentConfig, AppMessage } from "../types.js";
import { planPostProcess } from "./postProcess/planPostProcess.js";

/**
 * 多代理模型
 */
export class WiseAgent {
  debug = true;
  /** 当前对话轮次，以用户输入任务为一轮对话。 在一轮对话中，可能会有多个子代理进行多轮的交互 */
  round = 0;

  /** 代理助手 */
  planAgent: ToolLoopAgent;
  chatAgent: ToolLoopAgent;
  browserAgent: ToolLoopAgent;
  voiceAgent: ToolLoopAgent;
  ttsAgent: ToolLoopAgent;
  // criticAgent: ToolLoopAgent;

  /** 全局唯一的中断 */
  controller: AbortController;
  /** 大模型上下文消息，用于模型对话。 不要求实时性（可以在流结束后，从stream上取值存放进来) */
  modelMessage: ModelMessage[] = [];
  /** 应用上下文消息，用于UI渲染。  不使用 ai-sdk的 UIMessage 是它不方便 。 【实时数据流】(必须从流事件中获取内容，才有stream效果)*/
  appMessage: AppMessage[] = [];

  /** 保存局部变量的引用。 它们都会压入 appMessage 的 */
  currentPlanMessage: AppMessage | null = null;
  currentChatMessage: AppMessage | null = null;

  // 特性开关：
  autoCompressContext = false; // 每一轮自动压缩上下文

  constructor() {
    this.planAgent = buildAgent(planAgentConfig[0]!, planPrompt, buildPlanTools(this));
    this.chatAgent = buildAgent(chatAgentConfig[0]!, chatPrompt);
    this.browserAgent = buildAgent(browserAgentConfig[0]!, browserPrompt);
    this.voiceAgent = buildAgent(voiceAgentConfig[0]!, voicePrompt);
    this.ttsAgent = buildAgent(ttsAgentConfig[0]!, ttsPrompt);
    // this.criticAgent = buildAgent(criticAgentConfig[0]!, criticPrompt);

    this.controller = new AbortController();
  }
  /** 开启一轮对话
   * type UserContent = string | Array<TextPart | ImagePart | FilePart>;
   */
  async chat(content: UserContent) {
    this.round++;

    this.modelMessage.push({
      role: "user",
      content: content,
    });
    this.appMessage.push({
      role: "user",
      content: content,
    });

    const stream = await this.planAgent.stream({
      messages: this.modelMessage,
    });

    if (this.debug) {
      await stream_log(stream, "plan");
    }

    await planPostProcess(this, stream);

    console.log("本轮对话后：wiseAgent=", this);
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
