import type { AgentConfig } from "../../types";
import { createOpenAI } from "@ai-sdk/openai";

export const planAgentConfig: AgentConfig[] = [
  {
    name: "qwen3-asr-flash",
    aiProvider: createOpenAI({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
    description:
      "通义千问3-ASR-Flash是一款基于大语言模型的高精度、高智能、高鲁棒性的多语种语音识别模型。依托强大的基座模型、海量的文本与多模态数据、千万小时音频数据，通义千问3-ASR-Flash实现了高精度的语音识别功能，能够自动判断语种并准确识别11个语种的语音，在复杂的音频环境下能够保证精确转录。",
    price: `input: 0.22元/每秒`,
  },
  {
    name: "fun-asr",
    aiProvider: createOpenAI({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
    description:
      "通义百聆新一代语音识别大模型，主打中文、英文、日文语音识别，多地区方言覆盖，具备更强的噪声鲁棒性，适应多样复杂环境，国内用户首推。",
    price: `input: 0.22元/每秒`,
  },
  {
    name: "qwen-audio-turbo",
    aiProvider: createOpenAI({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
    description:
      "通义千问Audio是阿里云研发的大规模音频语言模型，能够接受多种音频（包括说话人语音、自然声音、音乐、歌声）和文本作为输入，并输出文本。通义千问Audio不仅能对输入的音频进行转录，还具备更深层次的语义理解、情感分析、音频事件检测、语音聊天等能力。本模型为2024年12月04日快照版本。",
    price: `无说明`,
  },
  {
    name: "fun-asr-realtime",
    aiProvider: createOpenAI({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
    description:
      "通义实验室新一代端到端语音识别大模型的实时版，基于领先的自研语音技术，具备卓越的上下文感知和高精度语音转写能力。基于端到端架构，Fun-ASR 集成了创新的 RAG 技术，支持大规模热词自定义、敏感/语气词自动过滤、ITN 规范化、标点预测等多维功能，显著提升了整体识别准确率和语境贴合度。同时，Fun-ASR 支持中英文自由切换，多地区方言覆盖，具备更强的噪声鲁棒性，适应多样复杂环境。",
    price: `input: 0.33 元/秒`,
  },
];
