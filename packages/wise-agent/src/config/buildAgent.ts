import { ToolLoopAgent } from "ai";
import type { AgentConfig } from "../../types.js";

export function buildAgent(config: AgentConfig, prompt: string) {
  return new ToolLoopAgent({
    model: config.provider(config.name),
    instructions: prompt,
    tools: config.tools,
  });
}
