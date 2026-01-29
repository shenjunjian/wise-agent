import type { TextStreamPart } from "ai";
import type { AgentRoles, AppMessage, ToolInputContent } from "../../types.js";

export function onStart(role: AgentRoles, chunk: TextStreamPart<{}>, matchedFn: (message: AppMessage) => void) {
  if (chunk.type === "start") {
    matchedFn({ role, content: [] });
  }
}

export function onFinish(role: AgentRoles, chunk: TextStreamPart<{}>, matchedFn: () => void) {
  if (chunk.type === "finish") {
    matchedFn();
  }
}

let textMessage: AppMessage;
export function onText(
  role: AgentRoles,
  chunk: TextStreamPart<{}>,
  matchedFn: (message: AppMessage) => void,
  textEndFn: (message: AppMessage) => void,
) {
  if (chunk.type === "text-start") {
    textMessage = { id: "", role, content: "" };
    matchedFn(textMessage);
  } else if (chunk.type === "text-delta") {
    textMessage.content += chunk.text;
  } else if (chunk.type === "text-end") {
    textEndFn(textMessage);
    // @ts-ignore
    textMessage = null;
  }
}

let toolContent: ToolInputContent;
export function onTool(
  chunk: TextStreamPart<{}>,
  matchedFn: (content: ToolInputContent) => void,
  inputEndFn: (content: ToolInputContent) => void,
) {
  if (chunk.type === "tool-input-start") {
    toolContent = { toolCallId: chunk.id, title: chunk.title, toolName: chunk.toolName, toolInput: "", toolResult: "" };
    matchedFn({ role: chunk.title || chunk.toolName, content: toolContent });
  } else if (chunk.type === "tool-input-delta") {
    toolContent.toolInput += chunk.delta;
  } else if (chunk.type === "tool-input-end") {
    inputEndFn(toolContent);
  } else if (chunk.type === "tool-call") {
  } else if (chunk.type === "tool-result") {
    toolContent.toolResult = chunk.output?.message;
  }
}
