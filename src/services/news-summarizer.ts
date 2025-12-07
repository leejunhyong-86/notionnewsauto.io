import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';

let genAI: GoogleGenerativeAI | null = null;

// Gemini API 초기화
if (config.ai.geminiApiKey) {
  genAI = new GoogleGenerativeAI(config.ai.geminiApiKey);
}

/**
 * 뉴스를 한글로 번역하고 한 줄로 요약
 */
export async function summarizeNewsInKorean(
  title: string,
  description?: string
): Promise<string | null> {
  // API 키가 없으면 요약하지 않음
  if (!genAI || !config.ai.geminiApiKey) {
    console.log('⚠️ Gemini API 키가 설정되지 않아 요약을 건너뜁니다.');
    return null;
  }

  try {
    // 사용 가능한 모델: gemini-pro (기본, 가장 안정적)
    // gemini-1.5-flash는 v1beta에서 지원되지 않을 수 있으므로 gemini-pro 사용
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // 요약 프롬프트
    const prompt = `다음 뉴스 기사를 한글로 번역하고 한 줄로 요약해주세요. 요약은 50자 이내로 간결하게 작성해주세요.

제목: ${title}
${description ? `내용: ${description.substring(0, 500)}` : ''}

한 줄 요약 (한글, 50자 이내):`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text().trim();

    return summary;
  } catch (error) {
    console.error('뉴스 요약 실패:', error);
    return null;
  }
}

