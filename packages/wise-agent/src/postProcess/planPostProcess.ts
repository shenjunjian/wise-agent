import type { ModelMessage, StreamTextResult, TextStreamPart } from "ai";
import type { WiseAgent } from "../wise-agent.js";
import type { AgentRoles, AppMessage, ToolInputContent } from "../../types.js";
import { onFinish, onStart, onText, onTool } from "./onEvents.js";
/**
 * 代理后处理是从stream 中，提取 request, response等信息,保存到 wiseAgent的UIMessage, ModelMessage中去。
 * @param wiseAgent
 */
export async function planPostProcess(wiseAgent: WiseAgent, stream: StreamTextResult<{}, never>) {
  // 0、 循环流消息，这样才能拿到文本流， 调用工具的命令流动态过程。
  // {type: 'start'}
  // {type: 'start-step', request: {…}, warnings: Array(0)}
  //
  //    {type: 'text-start', id: 'txt-0'}
  //    {type: 'text-delta', id: 'txt-0', text: '当然',
  //    ....
  //    {type: 'text-end', id: 'txt-0'}
  //
  //    {type: 'tool-input-start', id: 'call_c03d762c3b2143fdb10636', toolName: 'callChat', dynamic: false, title: 'chat'}
  //    {type: 'tool-input-delta', id: 'call_c03d762c3b2143fdb10636', delta: '{"question": "'}
  //    ...
  //    {type: 'tool-input-end', id: 'call_c03d762c3b2143fdb10636'}
  //
  //    {type: 'tool-call', toolCallId: 'call_c03d762c3b2143fdb10636', toolName: 'callChat', input: {…}, providerExecuted: undefined,title: 'chat'}
  //    {type: 'tool-result', toolCallId: 'call_c03d762c3b2143fdb10636', toolName: 'callChat', input: {…}, output: {…}, …}
  //
  // {type: 'finish-step', finishReason: 'tool-calls', rawFinishReason: 'tool_calls', usage: {…}, providerMetadata: {…}, …}
  // ---------- 开启下一轮对话
  // {type: 'start-step', request: {…}, warnings: Array(0)}
  // ...
  // {type: 'finish-step', finishReason: 'stop', rawFinishReason: 'stop', usage: {…}, providerMetadata: {…}, …}
  //
  // {type: 'finish', finishReason: 'stop', rawFinishReason: 'stop', totalUsage: {…}}

  for await (const chunk of stream.fullStream) {
    onStart("plan", chunk, (msg) => {
      wiseAgent.currentPlanMessage = msg;
      wiseAgent.appMessage.push(msg);
    });
    onFinish("plan", chunk, () => (wiseAgent.currentPlanMessage = null));

    onText(
      "plan",
      chunk,
      (msg) => {
        wiseAgent.currentPlanMessage?.content.push(msg);
      },
      (msg) => {
        wiseAgent.modelMessage.push({ role: "assistant", content: msg.content });
      },
    );
    onTool(
      chunk,
      (msg) => {
        wiseAgent.currentPlanMessage?.content.push(msg);
      },
      (msg) => {
        wiseAgent.modelMessage.push({ role: "assistant", content: msg.toolInput }); // 存入 modelMessage
      },
    );
  }
}
