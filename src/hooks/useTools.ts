import type { ToolSet } from 'ai'
import type { NextAgent } from '../next-agent'
import { ref } from 'vue'

/** 工具管理。
 * 三个来源：settings.tools,   mcpServers.tools，skills.tools
 * 一个删除: ignoreToolNames.value
 * */
export function useTools(agent: NextAgent) {
  const finalTools: ToolSet = {}
  const ignoreToolNames = ref<string[]>([])

  // 每次对话开始时，刷新工具
  agent.on('chatStart', async () => {
    // 清空工具
    Object.keys(finalTools).forEach((key) => {
      delete finalTools[key]
    })

    // 合并初始工具
    Object.assign(
      finalTools,
      agent.settings.tools || {},
      agent.$mcpServers.tools,
      agent.$skills.tools
    )

    // 移除忽略的工具
    ignoreToolNames.value.forEach((name) => {
      delete finalTools[name]
    })
  })

  return { finalTools, ignoreToolNames }
}
