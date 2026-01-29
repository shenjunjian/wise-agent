import type { ModelMessage, StreamTextResult } from "ai";
import type { WiseAgent } from "../wise-agent.js";
import { onFinish, onStart, onText } from "./onEvents.js";
/**
 * 代理后处理是从stream 中，提取 request, response等信息,保存到 wiseAgent的UIMessage, ModelMessage中去。
 * @param wiseAgent
 */
export async function chatPostProcess(wiseAgent: WiseAgent, stream: StreamTextResult<{}, never>) {
  for await (const chunk of stream.fullStream) {
    onStart("chat", chunk, (msg) => {
      wiseAgent.currentChatMessage = msg;
      wiseAgent.currentPlanMessage?.content.push(msg);
    });
    onFinish("chat", chunk, () => (wiseAgent.currentChatMessage = null));

    onText("chat", chunk, (msg) => wiseAgent.currentChatMessage?.content.push(msg));
  }
}
