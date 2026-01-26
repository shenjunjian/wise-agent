import type { AgentConfig } from "../../types";
import { createOpenAI } from "@ai-sdk/openai";

export const planAgentConfig: AgentConfig[] = [
  {
    name: "qwen3-tts-flash-realtime",
    aiProvider: createOpenAI({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
    description:
      " 通义千问3-TTS-Flash-Realtime模型是通义最新的实时语音合成大模型，不仅拥有17种高表现力的拟人音色，且能低延迟高稳定地实时合成音频；同时支持多种语言，方言，支持同一音色多语言输出。该模型经过海量数据训练，合成音频可以根据文本自适应调节语气，对复杂文本合成也有较好的处理能力。",
    price: `input: 1元/每万字符`,
  },
  {
    name: "qwen3-tts-flash",
    aiProvider: createOpenAI({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
    description:
      "通义千问3-TTS-Flash模型是通义最新推出的离线语音合成大模型，不仅拥有17种高表现力的拟人音色，且能低延迟高稳定地合成音频；同时支持多种语言，方言，支持同一音色多语言输出。该模型经过海量数据训练，合成音频可以根据文本自适应调节语气，对复杂文本合成也有较好的处理能力。",
    price: `input: 0.8元/每万字符`,
  },
  {
    name: "qwen-voice-enrollment",
    aiProvider: createOpenAI({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
    description:
      "通义千问voice-enrollment模型是千问语音模型的声音复刻系列模型，仅需5s以上的音频，即可迅速复刻高相似度声音。结合qwen3-tts-vc-realtime模型使用，可将一个人的声音高保真复刻，输出11个语种的语音。且合成音频可以根据文本自适应调节语气，对复杂文本合成也有较好的处理能力。",
    price: `input: 0.1元/每次`,
  },
  {
    name: "cosyvoice-v3-flash",
    aiProvider: createOpenAI({
      apiKey: import.meta.env.VITE_QWEN_APIKEY,
      baseURL: import.meta.env.VITE_QWEN_BASEURL,
    }),
    tools: {},
    description:
      "合成能力：CosyVoice-v3-Flash是通义实验室CosyVoice系列最新版高性能的语音合成大模型，较之前版本在自然度、音质、韵律、情感表现力上有更好的表现。该模型支持文本至语音的实时流式合成。克隆能力：CosyVoice-v3-Flash也是通义实验室CosyVoice系列最新版的语音克隆大模型，较之前版本提升了发音准确性、音色相似度，并且增加了更多小语种支持（德、西、法、意、俄）。仅需提供5-20s的参考音频，即可迅速生成高度相似且听感自然的定制声音。",
    price: `input: 1元/每万字符`,
  },
];
