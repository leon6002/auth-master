/**
 * An array of public routes that do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/pricing", "/api/uploadthing"];

export const authRoutes = ["/auth/login", "/auth/register"];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const DEFAULT_AGENT_PATH = "/agent";

export const DEFAULT_AGENT_VALUE = "general";
export const DEFAUTL_MODEL_VALUE = "llama3.1:8b";

export const AVALIABLE_AGENTS = ["general", "travel", "stock"];
export const AVALIABLE_MODELS = ["llama3.1:8b", "gpt-4o-mini", "gpt-4o"];

export const modelIndex = (model: string): number => {
  if (!model || AVALIABLE_MODELS.indexOf(model) === -1) {
    return 0;
  }
  return AVALIABLE_MODELS.indexOf(model);
};

export const agentIndex = (agent: string): number => {
  if (!agent || AVALIABLE_AGENTS.indexOf(agent) === -1) {
    return 0;
  }
  return AVALIABLE_AGENTS.indexOf(agent);
};

export const modelFromIndex = (index: number): string => {
  if (index === null || index === undefined) {
    index = 0;
  }
  return AVALIABLE_MODELS[index];
};

export const agentFromIndex = (index: number): string => {
  if (index === null || index === undefined) {
    index = 0;
  }
  return AVALIABLE_AGENTS[index];
};

export const EXAMPLE_MSGS = [
  [
    {
      heading: "今天",
      subheading: "有什么热点新闻？",
      message: `今天有什么热点新闻？`,
    },
    {
      heading: "写一个",
      subheading: "获取经济数据的python脚本",
      message: `写一个获取经济数据的python脚本`,
    },
  ],
  [
    {
      heading: "西宁有什么",
      subheading: "好玩的景点吗？",
      message: `西宁有什么好玩的景点吗`,
    },
    {
      heading: "西宁现在的",
      subheading: "天气怎么样",
      message: `西宁天气怎么样？`,
    },
    {
      heading: "规划一条",
      subheading: "在青海的7天自驾路线并计算开销",
      message: `请帮我规划一条在青海的7天自驾游玩路线并计算开销。`,
    },
    {
      heading: "这个时候",
      subheading: "适合去哪里旅游",
      message: `这个时候适合去哪里旅游`,
    },
  ],
  [
    {
      heading: "What are the",
      subheading: "trending memecoins today?",
      message: `What are the trending memecoins today?`,
    },
    {
      heading: "What is the price of",
      subheading: "$DOGE right now?",
      message: "What is the price of $DOGE right now?",
    },
    {
      heading: "I would like to buy",
      subheading: "42 $DOGE",
      message: `I would like to buy 42 $DOGE`,
    },
    {
      heading: "What are some",
      subheading: `recent events about $DOGE?`,
      message: `What are some recent events about $DOGE?`,
    },
  ],
];
