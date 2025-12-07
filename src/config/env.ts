import dotenv from 'dotenv';

dotenv.config();

export const config = {
  notion: {
    apiKey: process.env.NOTION_API_KEY || '',
    databaseId: process.env.NOTION_DATABASE_ID || '',
  },
  news: {
    apiKey: process.env.NEWS_API_KEY || '',
  },
  ai: {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
  },
};

// 필수 환경 변수 검증
if (!config.notion.apiKey) {
  throw new Error('NOTION_API_KEY가 설정되지 않았습니다.');
}

if (!config.notion.databaseId) {
  throw new Error('NOTION_DATABASE_ID가 설정되지 않았습니다.');
}

