# 多代理的大模型对话

## 运行环境：

NodeJS & BrowserJS

## 目标：

使用 `Typescript` 开发一个 `WiseAgent` 的 Class类，内部依赖 ai-sdk@v6版本来实现LLM的访问。

`WiseAgent`是一个总的代理管理对象，它内部管理着多个子`agent`对象，每个agent对象与自己擅长的大模型进行对话。初步计划需要包含子`agent`对象有： PlanAgent, ChatAgent , EmbedAgent,BrowserAgent, VoiceAgent,TTSAgent,VisionAgent,GenImageAgent,GenVideo, GenCoderAgent,CriticAgent等，每一轮对话由人类发起，先经过 PlaneAgent进行任务拆分和分派，经过不同的Agent进行处理后，最后由CirticAgent判断任务是否符合用户最初的要求，只有全部符合后才能结束一轮对话。

## Agent 统一配置

每一个Agent对象背后都有一套配置信息，比如 API_KEY, API_URL, AI_PROVIDER, TOOLS, Description，PRICE 等。因为每一个LLM模型，一般都是有`MAX`,`PLUS`,`FLASH`等不同规格的模型，这样设计方便用户切换配置。

## 消息管理

每一轮对话都分为 UIMessage 和 CoreMessage， 分别用于界面呈现和传递给LLM的消息体。UIMessage包含原始的输入，比如文字，语音，图片等， CoreMessage一般只保留对话后的结果。每一轮对话内部，要合理规划每一个Agent所需要的最小信息上下文，对话后要保存结果到Coremessage中，以及要保存每一次LLM交互的token消耗。

## 增强模式

用户可选择`RAG`, `SKILLS` 2种增强模型。启用这种模型时，会把相关的信息提供给 PlanAgent，让它判断处理，先获取相应的资源信息再开始后续的对话。

## 对话的可介入以及局部重试

在每一次子Agent对象对话时或调用工具时，可以停止下来，询问用户是否需要执行。在对话后，如果结果不合适，也可以由人类发起重试对话。
