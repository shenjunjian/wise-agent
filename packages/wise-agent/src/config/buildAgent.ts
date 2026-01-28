import { ToolLoopAgent, type ToolSet } from "ai";
import type { AgentConfig } from "../../types.js";

export function buildAgent(config: AgentConfig, prompt: string, tools?: ToolSet) {
  return new ToolLoopAgent({
    model: config.provider(config.name),
    instructions: prompt,
    tools: tools ? tools : null,
  });
}
